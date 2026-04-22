import { motion } from "motion/react";
import { Users, Activity } from "lucide-react";

interface Participant {
  id: string;
  name: string;
  isActive: boolean;
  color: string;
  tasksCompleted: number;
}

interface ParticipantsListProps {
  participants: Participant[];
}

export function ParticipantsList({ participants }: ParticipantsListProps) {
  const activeCount = participants.filter(p => p.isActive).length;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-slate-600" />
          <h3 className="text-lg font-bold text-slate-800">Équipe</h3>
        </div>
        <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
          <Activity className="w-4 h-4" />
          <span className="font-semibold">{activeCount} actifs</span>
        </div>
      </div>

      <div className="space-y-3">
        {participants.map((participant, index) => (
          <motion.div
            key={participant.id}
            className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            {/* Avatar (poisson miniature) */}
            <div className="relative">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm"
                style={{ backgroundColor: participant.color }}
              >
                <svg width="24" height="16" viewBox="0 0 24 16" className="drop-shadow">
                  <ellipse cx="13" cy="8" rx="8" ry="5" fill="white" opacity="0.9" />
                  <circle cx="17" cy="7" r="1.5" fill="black" />
                  <path d="M 1 8 Q 4 6, 6 8 Q 4 10, 1 8" fill="white" opacity="0.8" />
                </svg>
              </div>

              {/* Indicateur d'activité */}
              {participant.isActive && (
                <motion.div
                  className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </div>

            {/* Infos */}
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-slate-800 truncate">
                {participant.name}
              </div>
              <div className="text-xs text-slate-500">
                {participant.tasksCompleted} tâches complétées
              </div>
            </div>

            {/* Statut */}
            <div className={`text-xs font-medium px-2 py-1 rounded-full ${
              participant.isActive
                ? 'bg-green-100 text-green-700'
                : 'bg-slate-200 text-slate-600'
            }`}>
              {participant.isActive ? 'En action' : 'Inactif'}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Message d'encouragement */}
      <motion.div
        className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-sm text-slate-700 text-center">
          <span className="font-semibold">Objectif collectif :</span> Remplir l'aquarium ensemble ! 🐠
        </p>
      </motion.div>
    </div>
  );
}
