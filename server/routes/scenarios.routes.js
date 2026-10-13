import { Router } from 'express';
import { phishingScenarios } from '../../src/data/phishingData.js';

const router = Router();

export const PHISHING_SCENARIOS = phishingScenarios;

router.get('/scenarios/phishing', (req, res) => {
  res.json({
    count: PHISHING_SCENARIOS.length,
    scenarios: PHISHING_SCENARIOS
  });
});

export default router;
