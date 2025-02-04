import React, { useState } from 'react';
import { Trophy, RefreshCw, ChevronRight } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is the capital city of Nepal?",
    options: ["Pokhara", "Kathmandu", "Lalitpur", "Bhaktapur"],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "Which is the highest mountain peak in Nepal?",
    options: ["K2", "Kanchenjunga", "Mount Everest", "Annapurna"],
    correctAnswer: 2
  },
  {
    id: 3,
    question: "What is the national flower of Nepal?",
    options: ["Rhododendron", "Lotus", "Marigold", "Orchid"],
    correctAnswer: 0
  },
  {
    id: 4,
    question: "Which year was Nepal unified as a nation by King Prithvi Narayan Shah?",
    options: ["1768", "1789", "1801", "1750"],
    correctAnswer: 0
  },
  {
    id: 5,
    question: "What is the main religion practiced in Nepal?",
    options: ["Buddhism", "Islam", "Christianity", "Hinduism"],
    correctAnswer: 3
  }
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswerClick = (optionIndex: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(optionIndex);
    setIsAnswered(true);
    
    if (optionIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        {showScore ? (
          <div className="text-center">
            <Trophy className="w-20 h-20 mx-auto text-yellow-500 mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Complete!</h2>
            <p className="text-xl mb-6">
              You scored {score} out of {questions.length}
            </p>
            <button
              onClick={resetQuiz}
              className="flex items-center justify-center gap-2 mx-auto bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
              Try Again
            </button>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-gray-500">
                  Question {currentQuestion + 1}/{questions.length}
                </span>
                <span className="text-sm font-medium text-indigo-600">
                  Score: {score}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {questions[currentQuestion].question}
              </h2>
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(index)}
                    disabled={isAnswered}
                    className={`w-full text-left p-4 rounded-lg transition-colors ${
                      isAnswered
                        ? index === questions[currentQuestion].correctAnswer
                          ? 'bg-green-100 border-2 border-green-500'
                          : selectedAnswer === index
                          ? 'bg-red-100 border-2 border-red-500'
                          : 'bg-gray-100'
                        : selectedAnswer === index
                        ? 'bg-indigo-100 border-2 border-indigo-500'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            {isAnswered && (
              <button
                onClick={handleNextQuestion}
                className="flex items-center justify-center gap-2 w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                {currentQuestion === questions.length - 1 ? 'Show Results' : 'Next Question'}
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;