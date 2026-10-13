// ================================================================
// CENTRALIZED API CLIENT (WITH RESILIENT OFFLINE FALLBACK)
// ================================================================

import { 
  phishingScenarios as localScenarios,
  domainComparisonDrills as localDomains,
  emailSpoofingDrills as localEmails 
} from '../data/phishingData';
import { analyzeUrlHeuristics as localAnalyzeUrl } from '../utils/urlAnalyzer';

const API_BASE = '/api';

export const apiClient = {
  // Check backend server health
  async checkHealth() {
    try {
      const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(1500) });
      if (!res.ok) throw new Error('Health check failed');
      return await res.json();
    } catch {
      return { status: 'offline', fallback: true };
    }
  },

  // Fetch phishing attack scenarios
  async getPhishingScenarios() {
    try {
      const res = await fetch(`${API_BASE}/scenarios/phishing`, { signal: AbortSignal.timeout(2000) });
      if (!res.ok) throw new Error('Failed to fetch scenarios');
      const data = await res.json();
      return data.scenarios || data;
    } catch (err) {
      console.warn('[apiClient] Menggunakan dataset skenario lokal (Fallback Offline):', err.message);
      return localScenarios;
    }
  },

  // Fetch domain typosquatting drills
  async getDomainDrills() {
    try {
      const res = await fetch(`${API_BASE}/drills/domains`, { signal: AbortSignal.timeout(2000) });
      if (!res.ok) throw new Error('Failed to fetch domain drills');
      const data = await res.json();
      return data.drills || data;
    } catch (err) {
      console.warn('[apiClient] Menggunakan dataset domain lokal (Fallback Offline):', err.message);
      return localDomains;
    }
  },

  // Fetch email spoofing drills
  async getEmailDrills() {
    try {
      const res = await fetch(`${API_BASE}/drills/emails`, { signal: AbortSignal.timeout(2000) });
      if (!res.ok) throw new Error('Failed to fetch email drills');
      const data = await res.json();
      return data.drills || data;
    } catch (err) {
      console.warn('[apiClient] Menggunakan dataset email lokal (Fallback Offline):', err.message);
      return localEmails;
    }
  },

  // Analyze URL via Backend Heuristic Engine
  async analyzeUrl(url) {
    try {
      const res = await fetch(`${API_BASE}/scanner/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
        signal: AbortSignal.timeout(2500)
      });
      if (!res.ok) throw new Error('Scanner failed');
      return await res.json();
    } catch (err) {
      console.warn('[apiClient] Menggunakan analyzer lokal (Fallback Offline):', err.message);
      return localAnalyzeUrl(url);
    }
  },

  // Check DNS Sinkhole
  async checkDns(domain) {
    try {
      const res = await fetch(`${API_BASE}/dns/check?domain=${encodeURIComponent(domain)}`, {
        signal: AbortSignal.timeout(2000)
      });
      if (!res.ok) throw new Error('DNS check failed');
      return await res.json();
    } catch {
      return {
        domain,
        isBlocked: true,
        sinkholeIp: '0.0.0.0',
        provider: 'Local Threat Sinkhole Filter (Offline Fallback)'
      };
    }
  }
};
