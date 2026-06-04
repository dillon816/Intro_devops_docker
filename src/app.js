require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const client = require('prom-client');
const { initDB } = require('./models/db');
const taskRoutes = require('./routes/tasks');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Prometheus — registry isolé pour éviter les conflits avec les tests
const register = new client.Registry();
client.collectDefaultMetrics({ register });

const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Durée des requêtes HTTP en secondes',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.01, 0.05, 0.1, 0.3, 0.5, 1, 2, 5],
  registers: [register],
});

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Middleware de métriques HTTP
app.use((req, res, next) => {
  const end = httpRequestDuration.startTimer();
  res.on('finish', () => {
    end({
      method: req.method,
      route: req.route?.path ?? req.path,
      status_code: res.statusCode,
    });
  });
  next();
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Métriques Prometheus
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Routes
app.use('/api/tasks', taskRoutes);

// Error handling
app.use(errorHandler);

// Séparé pour pouvoir importer app dans les tests sans démarrer le serveurr
const start = async () => {
  await initDB();
  app.listen(PORT, () => console.log(`API sur http://localhost:${PORT}`));
};

if (require.main === module) start();

module.exports = app;