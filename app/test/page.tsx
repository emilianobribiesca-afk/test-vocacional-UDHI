'use client';

import { useState, useEffect } from 'react';
import {
  professionalQuestions,
  questionOrder,
  likertOptions,
  calculateProfessionalResults,
  LikertScale,
  TestAnswers
} from '@/lib/professionalVocationalTestV3';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Test() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<TestAnswers>({});
  const [selectedOption, setSelectedOption] = useState<LikertScale | null>(null);
  const [userName, setUserName] = useState('');
  const [startTime, setStartTime] = useState<number>(0);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      router.push('/register');
      return;
    }
    const user = JSON.parse(userInfo);
    setUserName(`${user.nombre} ${user.apellido}`);
    setStartTime(Date.now());
  }, [router]);

  const orderedQuestions = questionOrder.map(id => professionalQuestions.find(q => q.id === id)!);

  const handleAnswer = (value: LikertScale) => {
    setSelectedOption(value);
  };

  const handleNext = () => {
    if (selectedOption !== null) {
      const newAnswers = {
        ...answers,
        [orderedQuestions[currentQuestion].id]: selectedOption
      };
      setAnswers(newAnswers);

      if (currentQuestion < orderedQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        const nextQuestionId = orderedQuestions[currentQuestion + 1].id;
        setSelectedOption(newAnswers[nextQuestionId] || null);
      } else {
        const endTime = Date.now();
        const results = calculateProfessionalResults(newAnswers, { startTime, endTime });
        localStorage.setItem('professionalVocationalResults', JSON.stringify(results));
        router.push('/results');
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      const prevQuestionId = orderedQuestions[currentQuestion - 1].id;
      setSelectedOption(answers[prevQuestionId] || null);
    }
  };

  const progress = ((currentQuestion + 1) / orderedQuestions.length) * 100;
  const question = orderedQuestions[currentQuestion];

  const displayQuestionNumber = currentQuestion + 1;
  const totalQuestions = orderedQuestions.length;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="px-6 lg:px-12 py-3 flex items-center justify-between">
          <Image
            src="/logo-udhi.webp"
            alt="UDHI - Universidad de Dolores Hidalgo"
            width={100}
            height={18}
            className="h-auto w-full max-w-[100px] logo-blue"
          />
          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
              <div className="text-xs text-gray-400">Participante</div>
              <div className="text-sm font-medium text-gray-900">{userName}</div>
            </div>
            <div className="text-sm font-bold text-[#1565C0]">
              {displayQuestionNumber}/{totalQuestions}
            </div>
          </div>
        </div>
        {/* Progress Bar - full width flush */}
        <div className="w-full h-1 bg-gray-100">
          <div
            className="h-full bg-[#1565C0] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Content - centered vertically and horizontally */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 lg:px-12 py-8">
        <div className="w-full max-w-2xl text-center">
          {/* Control Question Badge */}
          {question.isControl && (
            <div className="mb-4">
              <span className="inline-flex items-center px-3 py-1 bg-[#1565C0] text-white rounded-full text-xs font-semibold uppercase tracking-wide">
                Pregunta de Validación
              </span>
            </div>
          )}

          {/* Question */}
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 mb-8 lg:mb-10 leading-relaxed">
            {question.text}
          </h2>

          {/* Likert Scale */}
          <div className="grid grid-cols-5 gap-3 sm:gap-4 mb-8 lg:mb-10">
            {likertOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className={`relative flex flex-col items-center justify-center py-5 sm:py-7 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                  selectedOption === option.value
                    ? 'border-[#1565C0] bg-[#1565C0] shadow-lg scale-[1.03]'
                    : 'border-gray-200 bg-white hover:border-[#1565C0] hover:bg-blue-50'
                }`}
              >
                <div className={`text-2xl sm:text-3xl font-bold mb-1 ${
                  selectedOption === option.value ? 'text-white' : 'text-gray-900'
                }`}>
                  {option.value}
                </div>
                <div className={`text-[11px] sm:text-sm font-medium ${
                  selectedOption === option.value ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {option.label}
                </div>
                {selectedOption === option.value && (
                  <div className="absolute -top-2 -right-2">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow">
                      <svg className="w-4 h-4 text-[#1565C0]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-base transition-colors min-w-[160px] ${
                currentQuestion === 0
                  ? 'text-gray-300 border-2 border-gray-100 cursor-not-allowed'
                  : 'text-gray-700 border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
              }`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Anterior
            </button>

            <button
              onClick={handleNext}
              disabled={selectedOption === null}
              className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-base transition-colors min-w-[160px] ${
                selectedOption === null
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-[#1565C0] text-white hover:bg-[#0D47A1] shadow-lg'
              }`}
            >
              {currentQuestion === orderedQuestions.length - 1 ? (
                <>
                  Finalizar Test
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </>
              ) : (
                <>
                  Siguiente
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
