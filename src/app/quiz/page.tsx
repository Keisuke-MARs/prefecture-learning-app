'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { prefectures, regions } from '@/data/prefectures';
import { storage } from '@/utils/storage';

interface QuizQuestion {
    prefecture: typeof prefectures[0];
    options: string[];
    correctAnswer: string;
    type: 'prefecture-to-capital' | 'capital-to-prefecture';
}

export default function QuizPage() {
    const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
    const [selectedAnswer, setSelectedAnswer] = useState<string>('');
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [questionCount, setQuestionCount] = useState(0);
    const [selectedRegion, setSelectedRegion] = useState<string>('');
    const [quizMode, setQuizMode] = useState<'prefecture-to-capital' | 'capital-to-prefecture' | 'mixed'>('mixed');

    const generateQuestion = (): QuizQuestion => {
        const availablePrefectures = selectedRegion
            ? prefectures.filter(p => p.region === selectedRegion)
            : prefectures;

        const randomPrefecture = availablePrefectures[Math.floor(Math.random() * availablePrefectures.length)];

        let questionType: 'prefecture-to-capital' | 'capital-to-prefecture';
        if (quizMode === 'mixed') {
            questionType = Math.random() > 0.5 ? 'prefecture-to-capital' : 'capital-to-prefecture';
        } else {
            questionType = quizMode;
        }

        const correctAnswer = questionType === 'prefecture-to-capital'
            ? randomPrefecture.capital
            : randomPrefecture.name;

        // 選択肢を生成
        const otherOptions = availablePrefectures
            .filter(p => p.id !== randomPrefecture.id)
            .map(p => questionType === 'prefecture-to-capital' ? p.capital : p.name)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);

        const options = [correctAnswer, ...otherOptions].sort(() => Math.random() - 0.5);

        return {
            prefecture: randomPrefecture,
            options,
            correctAnswer,
            type: questionType
        };
    };

    const startNewQuestion = useCallback(() => {
        setCurrentQuestion(generateQuestion());
        setSelectedAnswer('');
        setShowResult(false);
    }, [selectedRegion, quizMode]);

    const handleAnswerSelect = (answer: string) => {
        if (showResult) return;
        setSelectedAnswer(answer);
    };

    const handleSubmit = () => {
        if (!selectedAnswer || !currentQuestion) return;

        setShowResult(true);
        const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

        if (isCorrect) {
            setScore(prev => prev + 1);
        }

        // 進捗を保存
        storage.updatePrefectureProgress(currentQuestion.prefecture.id, isCorrect);
        setQuestionCount(prev => prev + 1);
    };

    const handleNextQuestion = () => {
        startNewQuestion();
    };

    useEffect(() => {
        startNewQuestion();
    }, [selectedRegion, quizMode, startNewQuestion]);

    if (!currentQuestion) {
        return <div>Loading...</div>;
    }

    const isCorrect = showResult && selectedAnswer === currentQuestion.correctAnswer;
    const accuracy = questionCount > 0 ? Math.round((score / questionCount) * 100) : 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 py-8">
                <header className="text-center mb-8">
                    <Link href="/" className="inline-block mb-4 text-blue-600 hover:text-blue-800 dark:text-blue-400">
                        ← ホームに戻る
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                        クイズモード
                    </h1>

                    {/* 設定 */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                        <select
                            value={selectedRegion}
                            onChange={(e) => setSelectedRegion(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        >
                            <option value="">全地方</option>
                            {regions.map(region => (
                                <option key={region} value={region}>{region}地方</option>
                            ))}
                        </select>

                        <select
                            value={quizMode}
                            onChange={(e) => setQuizMode(e.target.value as 'prefecture-to-capital' | 'capital-to-prefecture' | 'mixed')}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        >
                            <option value="mixed">ミックス</option>
                            <option value="prefecture-to-capital">都道府県→県庁所在地</option>
                            <option value="capital-to-prefecture">県庁所在地→都道府県</option>
                        </select>
                    </div>
                </header>

                {/* スコア表示 */}
                <div className="text-center mb-8">
                    <div className="inline-flex gap-4 bg-white dark:bg-gray-800 rounded-lg px-6 py-3 shadow">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                            問題数: {questionCount}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                            正解: {score}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                            正解率: {accuracy}%
                        </span>
                    </div>
                </div>

                {/* クイズカード */}
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 mb-8">
                        <div className="text-center mb-8">
                            <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                {currentQuestion.prefecture.region}地方
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                                {currentQuestion.type === 'prefecture-to-capital'
                                    ? `${currentQuestion.prefecture.name}の県庁所在地は？`
                                    : `${currentQuestion.prefecture.capital}が県庁所在地の都道府県は？`
                                }
                            </h2>
                        </div>

                        {/* 選択肢 */}
                        <div className="grid grid-cols-1 gap-3 mb-8">
                            {currentQuestion.options.map((option, index) => {
                                let buttonClass = "w-full p-4 text-left border-2 rounded-lg transition-all duration-200 ";

                                if (showResult) {
                                    if (option === currentQuestion.correctAnswer) {
                                        buttonClass += "border-green-500 bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300";
                                    } else if (option === selectedAnswer) {
                                        buttonClass += "border-red-500 bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-300";
                                    } else {
                                        buttonClass += "border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400";
                                    }
                                } else {
                                    if (option === selectedAnswer) {
                                        buttonClass += "border-blue-500 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300";
                                    } else {
                                        buttonClass += "border-gray-300 dark:border-gray-600 hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900 text-gray-700 dark:text-gray-300";
                                    }
                                }

                                return (
                                    <button
                                        key={index}
                                        onClick={() => handleAnswerSelect(option)}
                                        className={buttonClass}
                                        disabled={showResult}
                                    >
                                        {option}
                                    </button>
                                );
                            })}
                        </div>

                        {/* アクションボタン */}
                        <div className="text-center">
                            {!showResult ? (
                                <button
                                    onClick={handleSubmit}
                                    disabled={!selectedAnswer}
                                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-8 rounded-lg transition-colors"
                                >
                                    回答する
                                </button>
                            ) : (
                                <div>
                                    <div className="mb-4">
                                        <span className={`text-lg font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                                            {isCorrect ? '正解！' : '不正解'}
                                        </span>
                                    </div>
                                    <button
                                        onClick={handleNextQuestion}
                                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
                                    >
                                        次の問題
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}