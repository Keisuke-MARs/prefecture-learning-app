'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { prefectures, regions } from '@/data/prefectures';
import { storage } from '@/utils/storage';

export default function StudyPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState<string>('');
    const [filteredPrefectures, setFilteredPrefectures] = useState(prefectures);

    useEffect(() => {
        if (selectedRegion) {
            setFilteredPrefectures(prefectures.filter(p => p.region === selectedRegion));
        } else {
            setFilteredPrefectures(prefectures);
        }
        setCurrentIndex(0);
        setShowAnswer(false);
    }, [selectedRegion]);

    const currentPrefecture = filteredPrefectures[currentIndex];

    const handleNext = () => {
        setShowAnswer(false);
        setCurrentIndex((prev) => (prev + 1) % filteredPrefectures.length);
    };

    const handlePrevious = () => {
        setShowAnswer(false);
        setCurrentIndex((prev) => (prev - 1 + filteredPrefectures.length) % filteredPrefectures.length);
    };

    const handleShowAnswer = () => {
        setShowAnswer(true);
    };

    if (!currentPrefecture) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 py-8">
                <header className="text-center mb-8">
                    <Link href="/" className="inline-block mb-4 text-blue-600 hover:text-blue-800 dark:text-blue-400">
                        ← ホームに戻る
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                        学習モード
                    </h1>

                    {/* 地方選択 */}
                    <div className="mb-6">
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
                    </div>
                </header>

                {/* 進捗表示 */}
                <div className="text-center mb-8">
                    <div className="inline-block bg-white dark:bg-gray-800 rounded-lg px-4 py-2 shadow">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                            {currentIndex + 1} / {filteredPrefectures.length}
                        </span>
                    </div>
                </div>

                {/* 学習カード */}
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 mb-8">
                        <div className="text-center">
                            <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                {currentPrefecture.region}地方
                            </div>
                            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">
                                {currentPrefecture.name}
                            </h2>

                            {showAnswer ? (
                                <div className="animate-fade-in">
                                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                        県庁所在地
                                    </div>
                                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                                        {currentPrefecture.capital}
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={handleShowAnswer}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                                >
                                    県庁所在地を表示
                                </button>
                            )}
                        </div>
                    </div>

                    {/* ナビゲーションボタン */}
                    <div className="flex justify-between items-center">
                        <button
                            onClick={handlePrevious}
                            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                        >
                            ← 前へ
                        </button>

                        <div className="text-center">
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                                <div
                                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${((currentIndex + 1) / filteredPrefectures.length) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        <button
                            onClick={handleNext}
                            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                        >
                            次へ →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}