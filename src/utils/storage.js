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
      preTest: 0,
      phishing: 0,
      twoFactor: 0,
      postTest: 0
    },
    completedMissions: {
      preTest: false,
      phishing: false,
      twoFactor: false,
      postTest: false
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

export const RADAR_SESSION_KEY = 'cybergenz_radar_session_v1';

export function getRadarSession() {
  if (typeof window === 'undefined' || !window.localStorage) {
    return {
      simHistory: [],
      domainHistory: [],
      emailHistory: [],
      simIndex: 0,
      domainIndex: 0,
      emailIndex: 0
    };
  }
  try {
    const raw = localStorage.getItem(RADAR_SESSION_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load radar session from localStorage', e);
  }
  return {
    simHistory: [],
    domainHistory: [],
    emailHistory: [],
    simIndex: 0,
    domainIndex: 0,
    emailIndex: 0
  };
}

export function saveRadarSession(session) {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    localStorage.setItem(RADAR_SESSION_KEY, JSON.stringify(session));
  } catch (e) {
    console.error('Failed to save radar session to localStorage', e);
  }
}

export function resetRadarSession() {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    localStorage.removeItem(RADAR_SESSION_KEY);
  } catch (e) {
    console.error('Failed to reset radar session', e);
  }
}

export const POST_TEST_SESSION_KEY = 'cybergenz_post_test_session_v1';

export function getPostTestSession() {
  if (typeof window === 'undefined' || !window.localStorage) {
    return {
      answers: {},
      isSubmitted: false,
      score: 0
    };
  }
  try {
    const raw = localStorage.getItem(POST_TEST_SESSION_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load post-test session from localStorage', e);
  }
  return {
    answers: {},
    isSubmitted: false,
    score: 0
  };
}

export function savePostTestSession(session) {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    localStorage.setItem(POST_TEST_SESSION_KEY, JSON.stringify(session));
  } catch (e) {
    console.error('Failed to save post-test session to localStorage', e);
  }
}

export function resetPostTestSession() {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    localStorage.removeItem(POST_TEST_SESSION_KEY);
  } catch (e) {
    console.error('Failed to reset post-test session', e);
  }
}

export const PRE_TEST_SESSION_KEY = 'cybergenz_pre_test_session_v1';

export function getPreTestSession() {
  if (typeof window === 'undefined' || !window.localStorage) {
    return {
      answers: {},
      isSubmitted: false,
      score: 0
    };
  }
  try {
    const raw = localStorage.getItem(PRE_TEST_SESSION_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load pre-test session from localStorage', e);
  }
  return {
    answers: {},
    isSubmitted: false,
    score: 0
  };
}

export function savePreTestSession(session) {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    localStorage.setItem(PRE_TEST_SESSION_KEY, JSON.stringify(session));
  } catch (e) {
    console.error('Failed to save pre-test session to localStorage', e);
  }
}

export function resetPreTestSession() {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    localStorage.removeItem(PRE_TEST_SESSION_KEY);
  } catch (e) {
    console.error('Failed to reset pre-test session', e);
  }
}

export const TWO_FACTOR_SESSION_KEY = 'cybergenz_two_factor_session_v1';

export function getTwoFactorSession() {
  if (typeof window === 'undefined' || !window.localStorage) {
    return {
      activeTab: 'demo',
      completedTabs: ['demo'],
      drillScores: {},
      selectedAnswers: {},
      score: 0
    };
  }
  try {
    const raw = localStorage.getItem(TWO_FACTOR_SESSION_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load two-factor session from localStorage', e);
  }
  return {
    activeTab: 'demo',
    completedTabs: ['demo'],
    drillScores: {},
    selectedAnswers: {},
    score: 0
  };
}

export function saveTwoFactorSession(session) {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    localStorage.setItem(TWO_FACTOR_SESSION_KEY, JSON.stringify(session));
  } catch (e) {
    console.error('Failed to save two-factor session to localStorage', e);
  }
}

export function resetTwoFactorSession() {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    localStorage.removeItem(TWO_FACTOR_SESSION_KEY);
  } catch (e) {
    console.error('Failed to reset two-factor session', e);
  }
}

export function resetStoredProgress() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LEGACY_STORAGE_KEY);
    resetRadarSession();
    resetPreTestSession();
    resetPostTestSession();
    resetTwoFactorSession();
  } catch (e) {
    console.error('Failed to reset progress', e);
  }
  return {
    studentName: '',
    scores: {
      preTest: 0,
      phishing: 0,
      twoFactor: 0,
      postTest: 0
    },
    completedMissions: {
      preTest: false,
      phishing: false,
      twoFactor: false,
      postTest: false
    }
  };
}

