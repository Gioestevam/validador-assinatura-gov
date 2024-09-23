import request from 'supertest';
import app from '../src/index';

describe('POST /verify-signature', () => {
    it('Deve retornar 422 se nenhum arquivo for enviado', async () => {
        const res = await request(app).post('/verify-signature');
        expect(res.statusCode).toEqual(422);
        expect(res.body).toHaveProperty('message');
    });
});