require('dotenv').config();
const { Pool } = require('pg');

// Pool de connexions : réutilise les connexions existantes plutôt que d'en ouvrir une par requête
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'todo_db',
  user: process.env.DB_USER || 'todo_user',
  password: process.env.DB_PASSWORD || 'todo_pass',
});

// Crée la table si elle n'existe pas encore
const initDB = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS tasks (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      title VARCHAR(255),
      description TEXT NOT NULL,
      status VARCHAR(50) DEFAULT 'todo',
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `);
  console.log('✅ Table tasks prête');
};

module.exports = { pool, initDB };