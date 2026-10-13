import { Router } from 'express';
import { checkDomainSinkhole } from '../services/dnsBlocklistService.js';

const router = Router();

router.get('/dns/check', (req, res) => {
  const domain = req.query.domain;
  if (!domain) {
    return res.status(400).json({ error: 'Query parameter "domain" wajib disertakan.' });
  }

  const result = checkDomainSinkhole(domain);
  res.json({
    timestamp: new Date().toISOString(),
    ...result
  });
});

export default router;
