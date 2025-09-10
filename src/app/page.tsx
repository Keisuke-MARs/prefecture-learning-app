'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { storage } from '@/utils/storage';
import { prefectures } from '@/data/prefectures';

export default function Home() {
  const [progress, setProgress] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    setProgress(storage.getProgress());
    setSettings(storage.getSettings());
  }, []);

  const totalPrefectures = prefectures.length;
  const studiedPrefectures = progress.length;
  const correctAnswers = progress.reduce((sum, p) => sum + p.correctCount, 0);
  const totalAnswers = progress.reduce((sum, p) => sum + p.correctCount + p.incorrectCount, 0);
  const accuracy = totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            都道府県学習アプリ
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            日本の47都道府県と県庁所在地を楽しく学習しよう！
          </p>
        </header>

        {/* 進捗統計 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">学習済み</h3>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {studiedPrefectures}/{totalPrefectures}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">正解率</h3>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {accuracy}%
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">正解数</h3>
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {correctAnswers}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">総回答数</h3>
            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {totalAnswers}
            </p>
          </div>
        </div>

        {/* メニューカード */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link href="/study" className="group">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <div className="text-4xl mb-4">📚</div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                学習モード
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                都道府県と県庁所在地を確認しながら学習できます
              </p>
            </div>
          </Link>

          <Link href="/quiz" className="group">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <div className="text-4xl mb-4">🎯</div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                クイズモード
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                選択式クイズで知識をテストしましょう
              </p>
            </div>
          </Link>

          <Link href="/settings" className="group">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <div className="text-4xl mb-4">⚙️</div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                設定
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                学習設定やテーマを変更できます
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}