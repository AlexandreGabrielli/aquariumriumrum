import { motion } from "motion/react";
import { CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizCardProps {
  quiz: QuizQuestion;
  onAnswer: (isCorrect: boolean) => void;
}

export function QuizCard({ quiz, onAnswer }: QuizCardProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleSubmit = () => {
    if (selectedOption === null) return;

    const isCorrect = selectedOption === quiz.correctAnswer;
    setHasAnswered(true);

    setTimeout(() => {
      onAnswer(isCorrect);
      setSelectedOption(null);
      setHasAnswered(false);
    }, 1500);
  };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {/* Question */}
      <h3 className="text-2xl font-bold text-slate-800 mb-6">
        {quiz.question}
      </h3>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {quiz.options.map((option, index) => {
          const isSelected = selectedOption === index;
          const isCorrect = index === quiz.correctAnswer;
          const showResult = hasAnswered && isSelected;

          return (
            <motion.button
              key={index}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                isSelected
                  ? showResult
                    ? isCorrect
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    : 'border-blue-500 bg-blue-50'
                  : 'border-slate-200 bg-slate-50 hover:border-slate-300'
              } ${hasAnswered ? 'pointer-events-none' : ''}`}
              onClick={() => !hasAnswered && setSelectedOption(index)}
              whileHover={!hasAnswered ? { scale: 1.02 } : {}}
              whileTap={!hasAnswered ? { scale: 0.98 } : {}}
            >
              <div className="flex items-center justify-between">
                <span className="text-slate-700 font-medium">{option}</span>
                {showResult && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    {isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600" />
                    )}
                  </motion.div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Bouton de validation */}
      <motion.button
        className={`w-full py-4 rounded-xl font-semibold text-white transition-all ${
          selectedOption !== null
            ? 'bg-blue-600 hover:bg-blue-700'
            : 'bg-slate-300 cursor-not-allowed'
        }`}
        onClick={handleSubmit}
        disabled={selectedOption === null || hasAnswered}
        whileHover={selectedOption !== null ? { scale: 1.02 } : {}}
        whileTap={selectedOption !== null ? { scale: 0.98 } : {}}
      >
        {hasAnswered ? 'Réponse enregistrée...' : 'Valider la réponse'}
      </motion.button>

      {/* Feedback après réponse */}
      {hasAnswered && (
        <motion.div
          className={`mt-4 p-4 rounded-xl ${
            selectedOption === quiz.correctAnswer
              ? 'bg-green-100 text-green-800'
              : 'bg-amber-100 text-amber-800'
          }`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {selectedOption === quiz.correctAnswer ? (
            <>
              <p className="font-semibold">Excellent ! ✓</p>
              <p className="text-sm mt-1">Le niveau d'eau monte...</p>
            </>
          ) : (
            <>
              <p className="font-semibold">Pas tout à fait...</p>
              <p className="text-sm mt-1">La question sera redistribuée à un autre participant.</p>
            </>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
