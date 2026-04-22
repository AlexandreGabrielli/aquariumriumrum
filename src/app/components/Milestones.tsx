import { motion } from "motion/react";
import { CheckCircle2, Circle, Flag } from "lucide-react";

interface Milestone {
  id: string;
  name: string;
  targetProgress: number;
  isCompleted: boolean;
}

interface MilestonesProps {
  milestones: Milestone[];
  currentProgress: number;
}

export function Milestones({ milestones, currentProgress }: MilestonesProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <Flag className="w-5 h-5 text-slate-600" />
        <h3 className="text-lg font-bold text-slate-800">Jalons du projet</h3>
      </div>

      <div className="space-y-4">
        {milestones.map((milestone, index) => {
          const isActive = currentProgress >= milestone.targetProgress;
          const isNext = !milestone.isCompleted && currentProgress < milestone.targetProgress &&
                        (index === 0 || milestones[index - 1].isCompleted);

          return (
            <motion.div
              key={milestone.id}
              className={`flex items-start gap-4 p-4 rounded-xl transition-all ${
                milestone.isCompleted
                  ? 'bg-green-50 border-2 border-green-200'
                  : isNext
                  ? 'bg-blue-50 border-2 border-blue-300 ring-2 ring-blue-100'
                  : 'bg-slate-50 border-2 border-slate-200'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Icône */}
              <div className="mt-1">
                {milestone.isCompleted ? (
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                ) : isNext ? (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Circle className="w-6 h-6 text-blue-600" />
                  </motion.div>
                ) : (
                  <Circle className="w-6 h-6 text-slate-400" />
                )}
              </div>

              {/* Contenu */}
              <div className="flex-1">
                <h4 className={`font-semibold ${
                  milestone.isCompleted ? 'text-green-700' :
                  isNext ? 'text-blue-700' : 'text-slate-600'
                }`}>
                  {milestone.name}
                </h4>

                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className={`h-full ${
                        milestone.isCompleted ? 'bg-green-500' :
                        isActive ? 'bg-blue-500' : 'bg-slate-300'
                      }`}
                      initial={{ width: 0 }}
                      animate={{
                        width: milestone.isCompleted
                          ? '100%'
                          : `${Math.min((currentProgress / milestone.targetProgress) * 100, 100)}%`
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <span className={`text-sm font-medium ${
                    milestone.isCompleted ? 'text-green-600' :
                    isNext ? 'text-blue-600' : 'text-slate-500'
                  }`}>
                    {milestone.targetProgress}%
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Progression globale */}
      <div className="mt-6 pt-6 border-t border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-slate-600">Progression globale</span>
          <span className="text-sm font-bold text-slate-800">{currentProgress}%</span>
        </div>
        <div className="bg-slate-200 rounded-full h-3 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500"
            initial={{ width: 0 }}
            animate={{ width: `${currentProgress}%` }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>
    </div>
  );
}
