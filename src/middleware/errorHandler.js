// Middleware d'erreurs Express — doit être le dernier app.use()
const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${err.message}`);
  res.status(err.statusCode || 500).json({
    error: err.message || 'Erreur interne du serveur',
  });
};

module.exports = errorHandler;