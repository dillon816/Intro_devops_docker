const request = require('supertest');
const app = require('../../app');
const { initDB, pool } = require('../../models/db');

beforeAll(async () => {
  await initDB();
});

afterAll(async () => {
  await pool.end();
});

describe('Health check', () => {
  test('GET /health retourne 200', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});

describe('CRUD /api/tasks', () => {
  let taskId;

  test('POST crée une tâche', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ description: 'Tâche de test', title: 'Test' });
    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBeDefined();
    taskId = res.body.id;
  });

  test('GET retourne la liste', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /:id retourne la tâche', async () => {
    const res = await request(app).get(`/api/tasks/${taskId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(taskId);
  });

  test('PUT met à jour le status', async () => {
    const res = await request(app)
      .put(`/api/tasks/${taskId}`)
      .send({ status: 'done' });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('done');
  });

  test('DELETE supprime la tâche', async () => {
    const res = await request(app).delete(`/api/tasks/${taskId}`);
    expect(res.statusCode).toBe(204);
  });

  test('GET retourne 404 après suppression', async () => {
    const res = await request(app).get(`/api/tasks/${taskId}`);
    expect(res.statusCode).toBe(404);
  });
});