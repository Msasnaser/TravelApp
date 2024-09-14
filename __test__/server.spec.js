

import { jest } from '@jest/globals';
import request from 'supertest';
import app from '../src/server/server';

describe('Express Server', () => {
  test('GET /api/getKeys should return API keys', async () => {
    const response = await request(app).get('/api/getKeys');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('username');
    expect(response.body).toHaveProperty('weatherKey');
    expect(response.body).toHaveProperty('pixabayKey');
  });
});


