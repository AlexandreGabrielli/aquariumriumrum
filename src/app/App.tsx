import { useState } from "react";
import { Aquarium } from "./components/Aquarium";
import { Plus, Minus, Sparkles, Trash2, Thermometer } from "lucide-react";

export default function App() {
  const [waterLevel, setWaterLevel] = useState(60);
  const [codeQuality, setCodeQuality] = useState(45);
  const [urgencyLevel, setUrgencyLevel] = useState(20);

  const participants = [
    { id: "1", name: "Sophie Martin", isActive: true, color: "#FF6B6B" },
    { id: "2", name: "Thomas Dubois", isActive: true, color: "#4ECDC4" },
    { id: "3", name: "Marie Laurent", isActive: false, color: "#95E1D3" },
    { id: "4", name: "Lucas Bernard", isActive: true, color: "#FFE66D" },
    { id: "5", name: "Emma Petit", isActive: true, color: "#AA96DA" },
    { id: "6", name: "Jules Moreau", isActive: false, color: "#FF8B94" },
  ];

  return (
    <div className="size-full bg-gradient-to-br from-sky-200 via-blue-100 to-cyan-100 p-4">
      <div className="size-full">
        <Aquarium waterLevel={waterLevel} participants={participants} codeQuality={codeQuality} urgencyLevel={urgencyLevel} />
      </div>

      {/* Controls */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3">
        {/* Water level controls */}
        <div className="flex gap-3">
          <button
            onClick={() => setWaterLevel(prev => Math.max(prev - 10, 0))}
            className="bg-white/90 backdrop-blur-sm hover:bg-white p-4 rounded-full shadow-lg transition-all hover:scale-110"
            title="Lower water level"
          >
            <Minus className="w-6 h-6 text-red-600" />
          </button>
          <button
            onClick={() => setWaterLevel(prev => Math.min(prev + 10, 100))}
            className="bg-white/90 backdrop-blur-sm hover:bg-white p-4 rounded-full shadow-lg transition-all hover:scale-110"
            title="Raise water level"
          >
            <Plus className="w-6 h-6 text-green-600" />
          </button>
        </div>

        {/* Code quality controls */}
        <div className="flex gap-3">
          <button
            onClick={() => setCodeQuality(prev => Math.max(prev - 10, 0))}
            className="bg-white/90 backdrop-blur-sm hover:bg-white p-4 rounded-full shadow-lg transition-all hover:scale-110"
            title="Lower code quality (more debris)"
          >
            <Trash2 className="w-6 h-6 text-amber-600" />
          </button>
          <button
            onClick={() => setCodeQuality(prev => Math.min(prev + 10, 100))}
            className="bg-white/90 backdrop-blur-sm hover:bg-white p-4 rounded-full shadow-lg transition-all hover:scale-110"
            title="Improve code quality (less debris)"
          >
            <Sparkles className="w-6 h-6 text-purple-600" />
          </button>
        </div>

        {/* Urgency controls */}
        <div className="flex gap-3">
          <button
            onClick={() => setUrgencyLevel(prev => Math.max(prev - 10, 0))}
            className="bg-white/90 backdrop-blur-sm hover:bg-white p-4 rounded-full shadow-lg transition-all hover:scale-110"
            title="Lower urgency (colder water)"
          >
            <Thermometer className="w-6 h-6 text-sky-500" />
          </button>
          <button
            onClick={() => setUrgencyLevel(prev => Math.min(prev + 10, 100))}
            className="bg-white/90 backdrop-blur-sm hover:bg-white p-4 rounded-full shadow-lg transition-all hover:scale-110"
            title="Raise urgency (hotter water)"
          >
            <Thermometer className="w-6 h-6 text-red-600" />
          </button>
        </div>
      </div>
    </div>
  );
}