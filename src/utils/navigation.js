// ================================================================
// MODERN SINGLE PAGE APP URL ROUTER & STATE PERSISTENCE
// PKM UBBG 2026 — CyberGenZ Simulator
// ================================================================

export const ROUTE_MAP = {
  welcome: '#/welcome',
  hub: '#/hub',
  phishing: '#/phishing',
  twoFactor: '#/two-factor',
  password: '#/password',
  privacy: '#/privacy'
};

const HASH_TO_VIEW = {
  '': 'welcome',
  '/': 'welcome',
  '#/': 'welcome',
  '#welcome': 'welcome',
  '#/welcome': 'welcome',
  '/welcome': 'welcome',
  '#hub': 'hub',
  '#/hub': 'hub',
  '/hub': 'hub',
  '#phishing': 'phishing',
  '#/phishing': 'phishing',
  '/phishing': 'phishing',
  '#two-factor': 'twoFactor',
  '#/two-factor': 'twoFactor',
  '/two-factor': 'twoFactor',
  '#twoFactor': 'twoFactor',
  '#/twoFactor': 'twoFactor',
  '/twoFactor': 'twoFactor',
  '#password': 'password',
  '#/password': 'password',
  '/password': 'password',
  '#privacy': 'privacy',
  '#/privacy': 'privacy',
  '/privacy': 'privacy'
};

/**
 * Resolves the view ID from current URL hash, pathname, or storage
 */
export function resolveCurrentRoute() {
  if (typeof window === 'undefined') return 'welcome';

  // 1. Check window.location.hash (e.g. #/phishing?tab=domain_comparator)
  const fullHash = window.location.hash || '';
  const hashPath = fullHash.split('?')[0];

  if (hashPath && HASH_TO_VIEW[hashPath]) {
    return HASH_TO_VIEW[hashPath];
  }

  // 2. Check window.location.pathname (e.g. /phishing)
  const rawPath = window.location.pathname.replace(/\/+$/, '') || '/';
  const cleanKey = '/' + rawPath.split('/').pop();
  if (cleanKey && HASH_TO_VIEW[cleanKey]) {
    return HASH_TO_VIEW[cleanKey];
  }

  // 3. If on root and user has already started before, go to hub; otherwise welcome
  try {
    const rawProgress = localStorage.getItem('cybergenz_progress_2026');
    if (rawProgress) {
      const parsed = JSON.parse(rawProgress);
      if (parsed.studentName) {
        return 'hub';
      }
    }
  } catch {
    // Ignore storage parse error
  }

  return 'welcome';
}

/**
 * Synchronizes the browser address bar URL with the active view and optional tab
 */
export function syncRouteToUrl(view, tab = null, replace = false) {
  if (typeof window === 'undefined') return;

  const baseHash = ROUTE_MAP[view] || '#/welcome';
  const query = tab ? `?tab=${encodeURIComponent(tab)}` : '';
  const targetUrl = `${baseHash}${query}`;

  if (window.location.hash !== targetUrl) {
    if (replace) {
      window.history.replaceState(null, '', targetUrl);
    } else {
      window.history.pushState(null, '', targetUrl);
    }
  }
}

/**
 * Extracts query parameters from hash or search
 */
export function getRouteParams() {
  if (typeof window === 'undefined') return {};
  const hashQuery = window.location.hash.includes('?') 
    ? window.location.hash.split('?')[1] 
    : '';
  const searchStr = hashQuery || window.location.search.replace(/^\?/, '');
  const params = new URLSearchParams(searchStr);
  return Object.fromEntries(params.entries());
}
