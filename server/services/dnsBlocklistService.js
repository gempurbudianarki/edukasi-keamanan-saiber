// ================================================================
// HAGEZI DNS SINKHOLE BLOCKLIST SERVICE
// Simulates DNS Sinkholing (0.0.0.0 redirection for dangerous domains)
// ================================================================

// Representative curated sample of active high-risk malicious domains
const BLOCKED_DOMAINS = new Set([
  'kemdikbud-kuota100gb.club',
  'instagram-copyright-appeal.xyz',
  'undangan-nikah-digital.xyz',
  'dana-kaget-klaim2026.xyz',
  'bca-klik-verifikasi.vip',
  'diamond-mlbb-gratis.site',
  'capcut-pro-mod.apk-hub.online'
]);

export function checkDomainSinkhole(domainInput) {
  if (!domainInput) return { isBlocked: false, domain: '' };
  
  const clean = domainInput.toLowerCase()
    .replace(/^https?:\/\//, '')
    .split('/')[0]
    .split(':')[0]
    .trim();

  // Check direct or wildcard match
  let isBlocked = BLOCKED_DOMAINS.has(clean);
  if (!isBlocked) {
    for (const b of BLOCKED_DOMAINS) {
      if (clean.endsWith('.' + b) || clean.includes(b)) {
        isBlocked = true;
        break;
      }
    }
  }

  return {
    domain: clean,
    isBlocked,
    sinkholeIp: isBlocked ? '0.0.0.0' : null,
    provider: 'HaGeZi Multi PRO++ DNS Blocklist Feed',
    action: isBlocked ? 'NXDOMAIN / Sinkhole Intercepted' : 'DNS Query Resolved'
  };
}
