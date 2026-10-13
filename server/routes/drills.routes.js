import { Router } from 'express';
import { domainComparisonDrills, emailSpoofingDrills } from '../../src/data/phishingData.js';

const router = Router();

export const DOMAIN_COMPARISON_DRILLS = domainComparisonDrills;
export const EMAIL_SPOOFING_DRILLS = emailSpoofingDrills;

router.get('/drills/domains', (req, res) => {
  res.json({
    count: DOMAIN_COMPARISON_DRILLS.length,
    drills: DOMAIN_COMPARISON_DRILLS
  });
});

router.get('/drills/emails', (req, res) => {
  res.json({
    count: EMAIL_SPOOFING_DRILLS.length,
    drills: EMAIL_SPOOFING_DRILLS
  });
});

export default router;
