import { Router } from 'express';

const router = Router();

router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    system: 'CyberGenZ PKM UBBG Security API',
    version: '2.0.0',
    timestamp: new Date().toISOString()
  });
});

export default router;
