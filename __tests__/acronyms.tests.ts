import request, { Response } from 'supertest';
import app from '../src/app';
import { prisma } from '../src/database/prisma';

afterAll(async done => {
  await prisma.$disconnect();
  done();
});

describe('Tests the acronym controller', () => {
  test('It should create a new acronym', done => {
    request(app)
      .post('/acronym')
      .send({
        text: 'testing',
        definition: '1234',
      })
      .then((response: Response) => {
        expect(response.status).toBe(201);
        done();
      });
  });

  test('It should search for acronyms', done => {
    request(app)
      .get('/acronym?search=testing&limit=1&from=0')
      .then((response: Response) => {
        expect(response.status).toBe(200);
        expect(response.headers).toHaveProperty('api-total-count');
        expect(response.headers).toHaveProperty('api-remaining');
        done();
      });
  });

  test('It should find an acronym', done => {
    request(app)
      .get('/acronym/1')
      .then((response: Response) => {
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('text');
        done();
      });
  });

  test('It should find a random acronym', done => {
    request(app)
      .get('/random/1')
      .then((response: Response) => {
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
        done();
      });
  });

  test('It should update one acronym', done => {
    request(app)
      .put('/acronym/1')
      .set({
        Authorization: 'xyz',
      })
      .send({
        text: 'edited',
        definition: 'edited',
      })
      .then((response: Response) => {
        expect(response.status).toBe(204);
        done();
      });
  });

  test('It should delete one acronym', done => {
    request(app)
      .delete('/acronym/1')
      .set({
        Authorization: 'xyz',
      })
      .then((response: Response) => {
        expect(response.status).toBe(204);
        done();
      });
  });

  test('It should return 401 status to unauthorized tokens when deleting.', done => {
    request(app)
      .delete('/acronym/1')
      .then((response: Response) => {
        expect(response.status).toBe(401);
        done();
      });
  });

  test('It should return 401 status to unauthorized tokens when updating.', done => {
    request(app)
      .put('/acronym/1')
      .send({
        text: '123',
        definition: '333',
      })
      .then((response: Response) => {
        expect(response.status).toBe(401);
        done();
      });
  });

  test('It should 404 everything else', done => {
    request(app)
      .get('/xxxxx')
      .then((response: Response) => {
        expect(response.status).toBe(404);
        done();
      });
  });
});
