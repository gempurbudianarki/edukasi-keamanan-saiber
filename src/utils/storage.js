export const STORAGE_KEY = 'cybergenz_pkm_progress_v1';
export const LEGACY_STORAGE_KEY = 'cybergenz_progress_2026';

/**
 * Migrasi data sesi progres lama secara otomatis (one-time migration)
 * agar siswa yang sudah memulai tidak kehilangan progress.
 */
export function migrateLegacyProgress() {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    const legacyData = localStorage.getItem(LEGACY_STORAGE_KEY);
    const currentData = localStorage.getItem(STORAGE_KEY);
    if (legacyData && !currentData) {
      localStorage.setItem(STORAGE_KEY, legacyData);
      localStorage.removeItem(LEGACY_STORAGE_KEY);
    }
  } catch (e) {
    console.warn('[storage] Gagal migrasi data legacy:', e);
  }
}

export function getStoredProgress() {
  migrateLegacyProgress();
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Failed to load progress from localStorage', e);
  }
  return {
    studentName: '',
    scores: {
      phishing: 0,
      twoFactor: 0,
      password: 0,
      privacy: 0
    },
    completedMissions: {
      phishing: false,
      twoFactor: false,
      password: false,
      privacy: false
    }
  };
}

export function saveStoredProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress to localStorage', e);
  }
}

export function resetStoredProgress() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LEGACY_STORAGE_KEY);
  } catch (e) {
    console.error('Failed to reset progress', e);
  }
  return {
    studentName: '',
    scores: {
      phishing: 0,
      twoFactor: 0,
      password: 0,
      privacy: 0
    },
    completedMissions: {
      phishing: false,
      twoFactor: false,
      password: false,
      privacy: false
    }
  };
}
