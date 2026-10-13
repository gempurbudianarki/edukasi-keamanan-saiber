import { Router } from 'express';
import { analyzeUrlHeuristics } from '../services/urlAnalyzerService.js';

const router = Router();

router.post('/scanner/analyze', (req, res) => {
  const { url } = req.body || {};
  if (!url) {
    return res.status(400).json({
      error: 'Parameter "url" wajib diisi untuk melakukan analisis keamanan.'
    });
  }

  const result = analyzeUrlHeuristics(url);
  res.json({
    timestamp: new Date().toISOString(),
    ...result
  });
});

export default router;
