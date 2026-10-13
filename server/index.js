import express from 'express';
import cors from 'cors';
import healthRoutes from './routes/health.routes.js';
import scenariosRoutes from './routes/scenarios.routes.js';
import drillsRoutes from './routes/drills.routes.js';
import scannerRoutes from './routes/scanner.routes.js';
import dnsRoutes from './routes/dns.routes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', healthRoutes);
app.use('/api', scenariosRoutes);
app.use('/api', drillsRoutes);
app.use('/api', scannerRoutes);
app.use('/api', dnsRoutes);

// Root fallback
app.get('/', (req, res) => {
  res.json({
    message: 'CyberGenZ PKM UBBG Security Simulation API is running.',
    endpoints: [
      '/api/health',
      '/api/scenarios/phishing',
      '/api/drills/domains',
      '/api/drills/emails',
      '/api/scanner/analyze (POST)',
      '/api/dns/check?domain=... (GET)'
    ]
  });
});

app.listen(PORT, () => {
  console.log(`[CyberGenZ API Server] Berjalan di port ${PORT}`);
  console.log(`[CyberGenZ API Server] Status Endpoint: http://localhost:${PORT}/api/health`);
});

export default app;
