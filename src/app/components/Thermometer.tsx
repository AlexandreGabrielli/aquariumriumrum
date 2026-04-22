import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

interface ThermometerProps {
  urgencyLevel: number; // 0-100
}

type UrgencyState = {
  label: string;
  sublabel: string;
  emoji: string;
  mercury: string;
  glow: string;
  badge: string;
  text: string;
};

function getUrgencyState(level: number): UrgencyState {
  if (level < 25) {
    return {
      label: "Cold water",
      sublabel: "Calm — time to do it right",
      emoji: "❄️",
      mercury: "from-cyan-400 via-sky-400 to-blue-500",
      glow: "shadow-blue-400/60",
      badge: "bg-sky-100 border-sky-300 text-sky-800",
      text: "text-sky-700",
    };
  } else if (level < 50) {
    return {
      label: "Warm water",
      sublabel: "Normal pace",
      emoji: "🌊",
      mercury: "from-green-400 via-teal-400 to-emerald-500",
      glow: "shadow-green-400/60",
      badge: "bg-green-100 border-green-300 text-green-800",
      text: "text-green-700",
    };
  } else if (level < 75) {
    return {
      label: "Hot water",
      sublabel: "Deadline close — high pressure",
      emoji: "🔥",
      mercury: "from-yellow-400 via-orange-400 to-red-500",
      glow: "shadow-orange-400/60",
      badge: "bg-orange-100 border-orange-300 text-orange-800",
      text: "text-orange-700",
    };
  } else {
    return {
      label: "Boiling water",
      sublabel: "Critical production — hotfix!",
      emoji: "🚨",
      mercury: "from-red-500 via-rose-500 to-red-700",
      glow: "shadow-red-500/70",
      badge: "bg-red-100 border-red-400 text-red-800",
      text: "text-red-700",
    };
  }
}

const TEMP_MIN = 14;
const TEMP_MAX = 40;

// Convert 0-100 level to temperature in °C
function toTemp(level: number): number {
  return Math.round(TEMP_MIN + ((level / 100) * (TEMP_MAX - TEMP_MIN)));
}

// Graduation marks as temperatures mapped to their % position on the tube
const GRAD_MARKS = [
  { temp: 40, pct: 100 },
  { temp: 34, pct: Math.round(((34 - TEMP_MIN) / (TEMP_MAX - TEMP_MIN)) * 100) },
  { temp: 27, pct: Math.round(((27 - TEMP_MIN) / (TEMP_MAX - TEMP_MIN)) * 100) },
  { temp: 20, pct: Math.round(((20 - TEMP_MIN) / (TEMP_MAX - TEMP_MIN)) * 100) },
  { temp: 14, pct: 0 },
];

export function Thermometer({ urgencyLevel }: ThermometerProps) {
  const state = getUrgencyState(urgencyLevel);
  const isBoiling = urgencyLevel >= 75;
  const currentTemp = toTemp(urgencyLevel);

  const [boilingBubbles, setBoilingBubbles] = useState<
    { id: number; x: number; delay: number }[]
  >([]);

  useEffect(() => {
    setBoilingBubbles(
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        x: 20 + Math.random() * 60,
        delay: Math.random() * 1.5,
      }))
    );
  }, []);

  return (
    <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-10">

      {/* Badge état */}
      <AnimatePresence mode="wait">
        <motion.div
          key={state.label}
          initial={{ opacity: 0, y: -6, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.9 }}
          transition={{ duration: 0.35 }}
          className={`rounded-xl border px-3 py-1.5 text-center shadow-md w-36 ${state.badge}`}
        >
          <div className="text-lg leading-none">{state.emoji}</div>
          <div className="text-xs font-bold mt-0.5">{state.label}</div>
          <div className="text-[10px] opacity-80 mt-0.5 leading-tight">{state.sublabel}</div>
        </motion.div>
      </AnimatePresence>

      {/* Thermomètre */}
      <div className="relative flex flex-col items-center">

        {/* Bulbe supérieur (capuchon) */}
        <div className="w-6 h-4 bg-gradient-to-b from-slate-200 to-slate-300 rounded-t-full border-2 border-slate-400 z-10" />

        {/* Tube en verre */}
        <div className="relative w-10 h-80 bg-white/50 backdrop-blur-sm border-4 border-slate-300 rounded-lg overflow-hidden shadow-inner">

          {/* Graduations */}
          <div className="absolute inset-0 flex flex-col justify-between py-2 pointer-events-none">
            {GRAD_MARKS.map(({ temp }) => (
              <div key={temp} className="flex items-center px-1">
                <div className="h-0.5 w-4 bg-slate-500 opacity-60" />
                <span className="text-[9px] font-semibold text-slate-600 ml-1 opacity-80">
                  {temp}°
                </span>
              </div>
            ))}
          </div>

          {/* Mercure animé */}
          <motion.div
            className={`absolute inset-x-0 bottom-0 bg-gradient-to-t ${state.mercury} shadow-lg`}
            initial={{ height: "0%" }}
            animate={{ height: `${urgencyLevel}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Reflet sur le mercure */}
            <div className="absolute right-1 top-2 bottom-2 w-1 bg-white/30 rounded-full" />

            {/* Bulles bouillonnantes si critique */}
            {isBoiling &&
              boilingBubbles.map((b) => (
                <motion.div
                  key={b.id}
                  className="absolute w-1.5 h-1.5 bg-white/50 rounded-full"
                  style={{ left: `${b.x}%` }}
                  initial={{ bottom: "0%", opacity: 0.7 }}
                  animate={{
                    bottom: ["0%", "100%"],
                    opacity: [0.7, 0],
                    scale: [1, 0.5],
                  }}
                  transition={{
                    duration: 0.9 + Math.random() * 0.5,
                    repeat: Infinity,
                    delay: b.delay,
                    ease: "easeOut",
                  }}
                />
              ))}
          </motion.div>

          {/* Current value */}
          <motion.div
            className="absolute -right-16 bg-slate-800 text-white text-xs px-2 py-0.5 rounded-lg shadow-md font-bold whitespace-nowrap"
            style={{ top: `${100 - urgencyLevel}%` }}
            animate={{ opacity: 1 }}
          >
            {currentTemp}°C
            <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-[4px] border-b-[4px] border-l-[5px] border-t-transparent border-b-transparent border-l-slate-800" />
          </motion.div>
        </div>

        {/* Bulbe inférieur (réservoir) */}
        <motion.div
          className={`relative w-12 h-12 rounded-full bg-gradient-to-br ${state.mercury} border-4 border-slate-300 shadow-xl ${state.glow}`}
          animate={
            isBoiling
              ? { scale: [1, 1.08, 1], boxShadow: ["0 0 12px rgba(239,68,68,0.4)", "0 0 24px rgba(239,68,68,0.8)", "0 0 12px rgba(239,68,68,0.4)"] }
              : { scale: 1 }
          }
          transition={
            isBoiling
              ? { duration: 0.6, repeat: Infinity, ease: "easeInOut" }
              : {}
          }
        >
          {/* Reflet sur le bulbe */}
          <div className="absolute top-2 left-2 w-3 h-3 bg-white/30 rounded-full" />
        </motion.div>
      </div>

      {/* Label sous le thermomètre */}
      <motion.div
        key={`label-${state.label}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`text-xs font-bold ${state.text} text-center`}
      >
        Urgency level
      </motion.div>
    </div>
  );
}
