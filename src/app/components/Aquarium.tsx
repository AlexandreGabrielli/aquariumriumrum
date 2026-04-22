import { motion } from "motion/react";
import { Fish } from "./Fish";
import { useEffect, useState } from "react";

interface Participant {
  id: string;
  name: string;
  isActive: boolean;
  color: string;
}

interface AquariumProps {
  waterLevel: number;
  participants: Participant[];
  codeQuality?: number; // 0-100, plus c'est élevé, moins il y a de détritus
}

export function Aquarium({ waterLevel, participants, codeQuality = 70 }: AquariumProps) {
  const [bubbles, setBubbles] = useState<{ id: number; x: number; delay: number }[]>([]);

  useEffect(() => {
    const newBubbles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
    }));
    setBubbles(newBubbles);
  }, []);

  // Calculer le nombre de détritus en fonction de la qualité du code
  const debrisCount = Math.floor((100 - codeQuality) / 10);
  const debris = Array.from({ length: debrisCount }, (_, i) => ({
    id: i,
    x: 15 + Math.random() * 70,
    type: Math.floor(Math.random() * 4),
    rotation: Math.random() * 360,
    scale: 0.8 + Math.random() * 0.4,
  }));

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-sky-100 to-sky-50 rounded-3xl overflow-hidden border-4 border-sky-300 shadow-2xl">
      {/* Fond de l'aquarium */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-amber-900/30 via-amber-800/20 to-transparent" />

      {/* Banc de sable */}
      <div className="absolute inset-x-0 bottom-0 h-20">
        {/* Sable avec texture */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <defs>
            <pattern id="sandTexture" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="#D4A574" opacity="0.3" />
              <circle cx="45" cy="25" r="1.5" fill="#C9A875" opacity="0.4" />
              <circle cx="70" cy="15" r="0.8" fill="#E0B589" opacity="0.3" />
              <circle cx="30" cy="40" r="1.2" fill="#D4A574" opacity="0.35" />
              <circle cx="85" cy="50" r="1" fill="#C9A875" opacity="0.3" />
              <circle cx="15" cy="70" r="0.9" fill="#E0B589" opacity="0.4" />
              <circle cx="60" cy="80" r="1.3" fill="#D4A574" opacity="0.35" />
              <circle cx="90" cy="90" r="1.1" fill="#C9A875" opacity="0.3" />
            </pattern>
          </defs>
          <path
            d="M 0 60 Q 25 50, 50 55 T 100 50 L 100 100 L 0 100 Z"
            fill="#D2B48C"
            transform="scale(10, 1)"
          />
          <path
            d="M 0 60 Q 25 50, 50 55 T 100 50 L 100 100 L 0 100 Z"
            fill="url(#sandTexture)"
            transform="scale(10, 1)"
            opacity="0.6"
          />
        </svg>

        {/* Ombres et relief du sable */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-amber-800/20 to-transparent" />
      </div>

      {/* Détritus (qualité du code) */}
      {debris.map((item) => (
        <div
          key={item.id}
          className="absolute bottom-2"
          style={{
            left: `${item.x}%`,
            transform: `rotate(${item.rotation}deg) scale(${item.scale})`,
          }}
        >
          {item.type === 0 && (
            // Canette
            <svg width="20" height="24" viewBox="0 0 20 24">
              <rect x="4" y="4" width="12" height="16" rx="2" fill="#C0C0C0" />
              <ellipse cx="10" cy="4" rx="6" ry="2" fill="#A8A8A8" />
              <ellipse cx="10" cy="20" rx="6" ry="2" fill="#888888" />
              <rect x="5" y="10" width="10" height="3" fill="#E0E0E0" opacity="0.5" />
            </svg>
          )}
          {item.type === 1 && (
            // Bouteille
            <svg width="16" height="28" viewBox="0 0 16 28">
              <rect x="6" y="0" width="4" height="6" fill="#2D5016" opacity="0.6" />
              <ellipse cx="8" cy="6" rx="6" ry="2" fill="#3A6B1F" opacity="0.6" />
              <path d="M 4 6 L 3 24 Q 3 26, 8 26 Q 13 26, 13 24 L 12 6 Z" fill="#4A7C2F" opacity="0.6" />
            </svg>
          )}
          {item.type === 2 && (
            // Papier/Déchet
            <svg width="24" height="16" viewBox="0 0 24 16">
              <path d="M 2 8 Q 6 4, 12 6 Q 18 8, 22 6 L 22 12 Q 18 14, 12 12 Q 6 10, 2 12 Z" fill="#8B7355" opacity="0.7" />
              <path d="M 2 8 Q 6 4, 12 6 Q 18 8, 22 6" stroke="#6B5345" strokeWidth="1" fill="none" opacity="0.5" />
            </svg>
          )}
          {item.type === 3 && (
            // Débris/Caillou
            <svg width="18" height="12" viewBox="0 0 18 12">
              <ellipse cx="9" cy="8" rx="8" ry="4" fill="#5A4A3A" opacity="0.6" />
              <ellipse cx="9" cy="6" rx="7" ry="3" fill="#6B5A4A" opacity="0.7" />
            </svg>
          )}
        </div>
      ))}

      {/* Indicateur de qualité du code */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${
            codeQuality >= 80 ? 'bg-green-500' :
            codeQuality >= 50 ? 'bg-yellow-500' :
            'bg-red-500'
          }`} />
          <div>
            <div className="text-xs text-slate-600">Qualité du code</div>
            <div className="text-sm font-bold text-slate-800">{Math.round(codeQuality)}%</div>
          </div>
        </div>
      </div>

      {/* Château */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
        <svg width="200" height="160" viewBox="0 0 200 160" className="drop-shadow-2xl">
          {/* Tour gauche */}
          <rect x="10" y="60" width="40" height="100" fill="#8B7355" />
          <rect x="10" y="60" width="40" height="100" fill="url(#castleGradient)" />
          <path d="M 10 60 L 15 55 L 20 60 L 25 55 L 30 60 L 35 55 L 40 60 L 45 55 L 50 60 Z" fill="#6B5345" />

          {/* Tour droite */}
          <rect x="150" y="60" width="40" height="100" fill="#8B7355" />
          <rect x="150" y="60" width="40" height="100" fill="url(#castleGradient)" />
          <path d="M 150 60 L 155 55 L 160 60 L 165 55 L 170 60 L 175 55 L 180 60 L 185 55 L 190 60 Z" fill="#6B5345" />

          {/* Corps central */}
          <rect x="50" y="80" width="100" height="80" fill="#A0826D" />
          <rect x="50" y="80" width="100" height="80" fill="url(#castleGradient)" />
          <path d="M 50 80 L 60 75 L 70 80 L 80 75 L 90 80 L 100 75 L 110 80 L 120 75 L 130 80 L 140 75 L 150 80 Z" fill="#8B7355" />

          {/* Porte/Entrée avec poisson */}
          <rect x="85" y="120" width="30" height="40" rx="15" fill="#5A4A3A" />
          <ellipse cx="100" cy="135" rx="12" ry="8" fill="#2C3E50" opacity="0.3" />

          {/* Poisson dans le château */}
          <g transform="translate(100, 135)">
            <motion.g
              animate={{
                x: [-3, 3, -3],
                scaleX: [1, -1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Queue */}
              <path d="M -8 0 Q -6 -2, -4 0 Q -6 2, -8 0" fill="#FFD700" opacity="0.9" />
              {/* Corps */}
              <ellipse cx="0" cy="0" rx="6" ry="3.5" fill="#FFD700" />
              {/* Oeil */}
              <circle cx="3" cy="-0.5" r="1" fill="white" />
              <circle cx="3.3" cy="-0.5" r="0.6" fill="black" />
              {/* Nageoires */}
              <path d="M -1 -2 Q 0 -3.5, 1 -2" fill="#FFD700" opacity="0.8" />
            </motion.g>
          </g>

          {/* Fenêtres */}
          <rect x="20" y="80" width="15" height="20" rx="2" fill="#4A5568" />
          <rect x="165" y="80" width="15" height="20" rx="2" fill="#4A5568" />
          <rect x="70" y="95" width="12" height="15" rx="2" fill="#4A5568" />
          <rect x="118" y="95" width="12" height="15" rx="2" fill="#4A5568" />

          {/* Détails de pierres */}
          <line x1="50" y1="100" x2="150" y2="100" stroke="#6B5345" strokeWidth="1" opacity="0.5" />
          <line x1="50" y1="120" x2="150" y2="120" stroke="#6B5345" strokeWidth="1" opacity="0.5" />
          <line x1="10" y1="100" x2="50" y2="100" stroke="#6B5345" strokeWidth="1" opacity="0.5" />
          <line x1="150" y1="100" x2="190" y2="100" stroke="#6B5345" strokeWidth="1" opacity="0.5" />

          {/* Dégradé */}
          <defs>
            <linearGradient id="castleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#000000" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#000000" stopOpacity="0" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Plantes aquatiques */}
      <div className="absolute bottom-0 left-[10%] w-12 h-24 bg-gradient-to-t from-emerald-700 via-emerald-600 to-emerald-500 rounded-t-full opacity-60"
           style={{ clipPath: "polygon(20% 0%, 40% 20%, 35% 40%, 45% 60%, 40% 80%, 50% 100%, 50% 100%, 40% 80%, 35% 60%, 30% 40%, 25% 20%)" }} />
      <div className="absolute bottom-0 right-[15%] w-16 h-32 bg-gradient-to-t from-emerald-800 via-emerald-700 to-emerald-600 rounded-t-full opacity-50"
           style={{ clipPath: "polygon(30% 0%, 45% 15%, 40% 35%, 50% 55%, 45% 75%, 50% 100%, 50% 100%, 40% 80%, 35% 60%, 30% 40%, 35% 20%)" }} />
      <div className="absolute bottom-0 left-[70%] w-10 h-20 bg-gradient-to-t from-green-700 via-green-600 to-green-500 rounded-t-full opacity-70"
           style={{ clipPath: "polygon(25% 0%, 50% 25%, 40% 50%, 55% 75%, 50% 100%, 50% 100%, 45% 80%, 35% 60%, 30% 40%, 30% 20%)" }} />

      {/* Eau avec effet de vague */}
      <motion.div
        className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-blue-400/60 via-blue-300/40 to-cyan-200/30"
        initial={{ height: "0%" }}
        animate={{ height: `${waterLevel}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Effet de surface de l'eau */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent" />

        {/* Ondulations */}
        <motion.div
          className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-cyan-300/20 to-transparent"
          animate={{
            scaleX: [1, 1.02, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Bulles */}
      {waterLevel > 5 && bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute w-2 h-2 bg-white/40 rounded-full"
          style={{ left: `${bubble.x}%` }}
          initial={{ bottom: "0%", opacity: 0.6 }}
          animate={{
            bottom: "100%",
            opacity: [0.6, 0.8, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: bubble.delay,
            ease: "linear",
          }}
        />
      ))}

      {/* Poissons */}
      {participants.map((participant, index) => {
        const baseY = 20 + (index * 15) % 60;
        const swimDepth = waterLevel > baseY ? baseY : Math.max(waterLevel - 10, 10);

        return (
          <Fish
            key={participant.id}
            name={participant.name}
            color={participant.color}
            isActive={participant.isActive}
            swimDepth={swimDepth}
            index={index}
          />
        );
      })}

      {/* Pipette graduée */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center">
        {/* Haut de la pipette */}
        <div className="w-8 h-12 bg-gradient-to-b from-slate-300 to-slate-400 rounded-t-full border-2 border-slate-500 relative">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-600 rounded-full" />
        </div>

        {/* Corps de la pipette */}
        <div className="relative w-16 h-96 bg-white/60 backdrop-blur-sm border-4 border-slate-400 rounded-lg shadow-lg overflow-hidden">
          {/* Graduations */}
          <div className="absolute inset-0 flex flex-col justify-between py-2">
            {[100, 75, 50, 25, 0].map((mark) => (
              <div key={mark} className="flex items-center px-1">
                <div className={`h-0.5 ${mark % 25 === 0 ? 'w-4 bg-slate-600' : 'w-2 bg-slate-400'}`} />
                {mark % 25 === 0 && (
                  <span className="text-xs font-bold text-slate-700 ml-1">{mark}</span>
                )}
              </div>
            ))}
          </div>

          {/* Liquide dans la pipette */}
          <motion.div
            className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-blue-500 via-blue-400 to-cyan-300"
            initial={{ height: "0%" }}
            animate={{ height: `${waterLevel}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Effet de reflet */}
            <div className="absolute right-1 top-4 bottom-4 w-1 bg-white/40 rounded-full" />
          </motion.div>

          {/* Valeur actuelle */}
          <motion.div
            className="absolute right-20 bg-slate-800 text-white px-3 py-1 rounded-lg shadow-lg font-bold"
            style={{ top: `${100 - waterLevel}%` }}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {Math.round(waterLevel)}%
            {/* Flèche */}
            <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-l-slate-800" />
          </motion.div>
        </div>

        {/* Base de la pipette */}
        <div className="w-16 h-4 bg-gradient-to-b from-slate-400 to-slate-500 border-2 border-t-0 border-slate-500 rounded-b-lg" />
      </div>
    </div>
  );
}
