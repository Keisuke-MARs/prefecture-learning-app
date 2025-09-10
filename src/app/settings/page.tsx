'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { storage, AppSettings, UserProgress } from '@/utils/storage';
import { regions } from '@/data/prefectures';

export default function SettingsPage() {
    const [settings, setSettings] = useState<AppSettings>({
        darkMode: false,
        studyMode: 'mixed',
        selectedRegions: [],
    });
    const [progress, setProgress] = useState<UserProgress[]>([]);

    useEffect(() => {
        setSettings(storage.getSettings());
        setProgress(storage.getProgress());
    }, []);

    const handleSettingChange = (key: keyof AppSettings, value: string | string[] | boolean) => {
        const newSettings = { ...settings, [key]: value };
        setSettings(newSettings);
        storage.saveSettings(newSettings);
    };

    const handleRegionToggle = (region: string) => {
        const newRegions = settings.selectedRegions.includes(region)
            ? settings.selectedRegions.filter(r => r !== region)
            : [...settings.selectedRegions, region];

        handleSettingChange('selectedRegions', newRegions);
    };

    const clearAllProgress = () => {
        if (confirm('すべての学習進捗を削除しますか？この操作は取り消せません。')) {
            storage.saveProgress([]);
            setProgress([]);
        }
    };

    const totalAnswers = progress.reduce((sum, p) => sum + p.correctCount + p.incorrectCount, 0);
    const correctAnswers = progress.reduce((sum, p) => sum + p.correctCount, 0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 py-8">
                <header className="text-center mb-8">
                    <Link href="/" className="inline-block mb-4 text-blue-600 hover:text-blue-800 dark:text-blue-400">
                        ← ホームに戻る
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                        設定
                    </h1>
                </header>

                <div className="max-w-2xl mx-auto space-y-8">
                    {/* 学習設定 */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                            学習設定
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    クイズモード
                                </label>
                                <select
                                    value={settings.studyMode}
                                    onChange={(e) => handleSettingChange('studyMode', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                >
                                    <option value="mixed">ミックス</option>
                                    <option value="prefecture-to-capital">都道府県→県庁所在地</option>
                                    <option value="capital-to-prefecture">県庁所在地→都道府県</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* 地方選択 */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                            学習対象地方
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            学習したい地方を選択してください（未選択の場合は全地方が対象）
                        </p>

                        <div className="grid grid-cols-2 gap-3">
                            {regions.map(region => (
                                <label key={region} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.selectedRegions.includes(region)}
                                        onChange={() => handleRegionToggle(region)}
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-gray-700 dark:text-gray-300">{region}地方</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* 学習統計 */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                            学習統計
                        </h2>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                    {progress.length}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    学習済み都道府県
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                    {totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0}%
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    総合正解率
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">正解数</span>
                                <span className="text-gray-800 dark:text-white">{correctAnswers}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">総回答数</span>
                                <span className="text-gray-800 dark:text-white">{totalAnswers}</span>
                            </div>
                        </div>
                    </div>

                    {/* データ管理 */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                            データ管理
                        </h2>

                        <div className="space-y-4">
                            <button
                                onClick={clearAllProgress}
                                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                            >
                                すべての進捗データを削除
                            </button>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                ※ この操作は取り消すことができません
                            </p>
                        </div>
                    </div>

                    {/* アプリ情報 */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                            アプリ情報
                        </h2>

                        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <div>バージョン: 1.0.0</div>
                            <div>都道府県数: 47</div>
                            <div>データ保存: ローカルストレージ</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}