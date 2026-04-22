import { Clock, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface TimerProps {
  endTime: Date;
  phase: "Découverte" | "Exécution" | "Consolidation";
}

export function Timer({ endTime, phase }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isUrgent, setIsUrgent] = useState(false);

  function calculateTimeLeft() {
    const now = new Date();
    const diff = endTime.getTime() - now.getTime();

    if (diff <= 0) {
      return { hours: 0, minutes: 0, seconds: 0, total: 0 };
    }

    return {
      hours: Math.floor(diff / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
      total: diff,
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      setIsUrgent(newTimeLeft.total > 0 && newTimeLeft.total < 10 * 60 * 1000);
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  const phaseColors = {
    "Découverte": "bg-blue-500",
    "Exécution": "bg-purple-500",
    "Consolidation": "bg-green-500",
  };

  const phaseTextColors = {
    "Découverte": "text-blue-600",
    "Exécution": "text-purple-600",
    "Consolidation": "text-green-600",
  };

  return (
    <motion.div
      className={`bg-white rounded-2xl shadow-xl p-6 ${isUrgent ? 'ring-4 ring-red-500' : ''}`}
      animate={isUrgent ? { scale: [1, 1.02, 1] } : {}}
      transition={{ duration: 1, repeat: Infinity }}
    >
      {/* Phase actuelle */}
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-3 h-3 rounded-full ${phaseColors[phase]}`} />
        <span className={`text-sm font-semibold ${phaseTextColors[phase]}`}>
          Phase : {phase}
        </span>
      </div>

      {/* Temps restant */}
      <div className="flex items-center gap-3 mb-2">
        <Clock className={`w-6 h-6 ${isUrgent ? 'text-red-500' : 'text-slate-600'}`} />
        <div className="flex gap-2 text-4xl font-bold text-slate-800">
          <span className="tabular-nums">{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="text-slate-400">:</span>
          <span className="tabular-nums">{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="text-slate-400">:</span>
          <span className="tabular-nums">{String(timeLeft.seconds).padStart(2, '0')}</span>
        </div>
      </div>

      {/* Message d'urgence */}
      {isUrgent && timeLeft.total > 0 && (
        <motion.div
          className="flex items-center gap-2 text-red-600 text-sm mt-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AlertCircle className="w-4 h-4" />
          <span>Moins de 10 minutes restantes !</span>
        </motion.div>
      )}

      {/* Temps écoulé */}
      {timeLeft.total <= 0 && (
        <div className="text-red-600 text-sm mt-2 font-semibold">
          Temps écoulé !
        </div>
      )}
    </motion.div>
  );
}
