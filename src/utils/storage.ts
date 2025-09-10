export interface UserProgress {
    prefectureId: number;
    correctCount: number;
    incorrectCount: number;
    lastStudied: string;
}

export interface AppSettings {
    darkMode: boolean;
    studyMode: 'prefecture-to-capital' | 'capital-to-prefecture' | 'mixed';
    selectedRegions: string[];
}

const STORAGE_KEYS = {
    PROGRESS: 'prefecture-learning-progress',
    SETTINGS: 'prefecture-learning-settings',
} as const;

export const storage = {
    // 進捗データの保存・取得
    getProgress(): UserProgress[] {
        if (typeof window === 'undefined') return [];
        const data = localStorage.getItem(STORAGE_KEYS.PROGRESS);
        return data ? JSON.parse(data) : [];
    },

    saveProgress(progress: UserProgress[]): void {
        if (typeof window === 'undefined') return;
        localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
    },

    updatePrefectureProgress(prefectureId: number, isCorrect: boolean): void {
        const progress = this.getProgress();
        const existingIndex = progress.findIndex(p => p.prefectureId === prefectureId);

        if (existingIndex >= 0) {
            if (isCorrect) {
                progress[existingIndex].correctCount++;
            } else {
                progress[existingIndex].incorrectCount++;
            }
            progress[existingIndex].lastStudied = new Date().toISOString();
        } else {
            progress.push({
                prefectureId,
                correctCount: isCorrect ? 1 : 0,
                incorrectCount: isCorrect ? 0 : 1,
                lastStudied: new Date().toISOString(),
            });
        }

        this.saveProgress(progress);
    },

    // 設定の保存・取得
    getSettings(): AppSettings {
        if (typeof window === 'undefined') {
            return {
                darkMode: false,
                studyMode: 'mixed',
                selectedRegions: [],
            };
        }

        const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
        return data ? JSON.parse(data) : {
            darkMode: false,
            studyMode: 'mixed',
            selectedRegions: [],
        };
    },

    saveSettings(settings: AppSettings): void {
        if (typeof window === 'undefined') return;
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    },
};