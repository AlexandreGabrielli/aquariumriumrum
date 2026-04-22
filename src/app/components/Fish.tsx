import { motion } from "motion/react";

interface FishProps {
  name: string;
  color: string;
  isActive: boolean;
  swimDepth: number;
  index: number;
}

export function Fish({ name, color, isActive, swimDepth, index }: FishProps) {
  const swimDuration = 8 + Math.random() * 4;
  const swimDelay = index * 1.5;

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{ bottom: `${swimDepth}%` }}
      initial={{ left: "0%", scaleX: 1 }}
      animate={{
        left: ["0%", "90%", "0%"],
        scaleX: [1, 1, -1, -1, 1],
      }}
      transition={{
        duration: swimDuration,
        repeat: Infinity,
        delay: swimDelay,
        ease: "easeInOut",
      }}
    >
      {/* Nom du participant (toujours visible) */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800/80 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full whitespace-nowrap shadow-lg z-10">
        {name}
      </div>

      {/* Corps du poisson avec animation */}
      <motion.div
        animate={isActive ? {
          y: [0, -3, 0],
        } : {}}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg width="48" height="32" viewBox="0 0 48 32" className="drop-shadow-lg">
          {/* Queue */}
          <motion.path
            d="M 2 16 Q 8 12, 12 16 Q 8 20, 2 16"
            fill={color}
            opacity="0.8"
            animate={{
              d: [
                "M 2 16 Q 8 12, 12 16 Q 8 20, 2 16",
                "M 2 16 Q 8 14, 12 16 Q 8 18, 2 16",
                "M 2 16 Q 8 12, 12 16 Q 8 20, 2 16",
              ],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Corps */}
          <ellipse cx="26" cy="16" rx="16" ry="10" fill={color} />

          {/* Nageoire dorsale */}
          <path d="M 22 8 Q 24 4, 26 8" fill={color} opacity="0.7" />

          {/* Nageoire ventrale */}
          <path d="M 22 24 Q 24 28, 26 24" fill={color} opacity="0.7" />

          {/* Oeil */}
          <circle cx="34" cy="14" r="3" fill="white" />
          <circle cx="35" cy="14" r="2" fill="black" />

          {/* Reflet dans l'oeil */}
          <circle cx="35.5" cy="13.5" r="0.8" fill="white" />

          {/* Bouche */}
          <path d="M 40 16 Q 42 17, 40 18" stroke={color} strokeWidth="1" fill="none" opacity="0.6" />

          {/* Écailles (effet de texture) */}
          <circle cx="20" cy="14" r="2" fill="white" opacity="0.15" />
          <circle cx="24" cy="17" r="2" fill="white" opacity="0.15" />
          <circle cx="28" cy="15" r="2" fill="white" opacity="0.15" />

          {/* Indicateur d'activité */}
          {isActive && (
            <>
              <motion.circle
                cx="26"
                cy="16"
                r="18"
                fill="none"
                stroke={color}
                strokeWidth="2"
                opacity="0.4"
                initial={{ scale: 0.8, opacity: 0.6 }}
                animate={{ scale: 1.3, opacity: 0 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            </>
          )}
        </svg>
      </motion.div>
    </motion.div>
  );
}
