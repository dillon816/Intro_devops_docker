const express = require('express');
const router = express.Router();
const { pool } = require('../models/db');

const httpError = (msg, status) => {
  const err = new Error(msg);
  err.statusCode = status;
  return err;
};

// GET /api/tasks
router.get('/', async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

// GET /api/tasks/:id
router.get('/:id', async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [req.params.id]);
    if (!result.rows.length) return next(httpError('Tâche non trouvée', 404));
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// POST /api/tasks
router.post('/', async (req, res, next) => {
  try {
    const { title, description, status = 'todo' } = req.body;
    if (!description) return next(httpError('description est obligatoire', 400));

    const result = await pool.query(
      'INSERT INTO tasks (title, description, status) VALUES ($1, $2, $3) RETURNING *',
      [title, description, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// PUT /api/tasks/:id — COALESCE garde l'ancienne valeur si le champ n'est pas envoyé
router.put('/:id', async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    const result = await pool.query(
      `UPDATE tasks
       SET title = COALESCE($1, title),
           description = COALESCE($2, description),
           status = COALESCE($3, status),
           updated_at = NOW()
       WHERE id = $4 RETURNING *`,
      [title, description, status, req.params.id]
    );
    if (!result.rows.length) return next(httpError('Tâche non trouvée', 404));
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/tasks/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const result = await pool.query(
      'DELETE FROM tasks WHERE id = $1 RETURNING id',
      [req.params.id]
    );
    if (!result.rows.length) return next(httpError('Tâche non trouvée', 404));
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;