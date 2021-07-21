import { PlayerHttpModule } from "../../src/player/player.http.module";
import { INestApplication } from "@nestjs/common";
import supertest from "supertest";
import connection from "../connection"

let app: INestApplication;

beforeAll(async () => {
    app = await connection(PlayerHttpModule)
});

afterAll(async () => {
    await app.close();
});

describe('Player Controller', () => {
    it('GET /player', async () => {
        const { body } = await supertest.agent(app.getHttpServer())
            .get('/player')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(body.length).toBe(16)
    })
})