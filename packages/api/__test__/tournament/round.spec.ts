import { RoundHttpModule } from '../../src/round/round.http.module'
import { PlayerHttpModule } from '../../src/player/player.http.module'
import { INestApplication } from '@nestjs/common'
import supertest from 'supertest'
import connection from '../connection'
import { RankingType } from '@cph-scorer/model'

let app: INestApplication


beforeAll(async () => {
  app = await connection(RoundHttpModule, PlayerHttpModule)

  const { body } = await supertest.agent(app.getHttpServer())
    .get('/player')

  await Promise.all(body.slice(0,4).map((x: any) => {
    return supertest.agent(app.getHttpServer())
      .post('/player/register')
      .send({ id: x.id, type: RankingType.SEN })
  }))
})

afterAll(async () => {
  await app.close()
})

describe('Round Controller', () => {
  it('POST /generate/:number, try generate impossible number of round', async () => {
    const { body } = await supertest.agent(app.getHttpServer())
      .post('/round/generate/4')
      .set('Accept', 'application/json')
      .expect(409)

    expect(body).toStrictEqual({ statusCode: 409, message: 'Max 50 call reach', error: 'Conflict' })
  })

  it('POST /generate/:number, try generate possible number of round', async () => {
    await supertest.agent(app.getHttpServer())
      .post('/round/generate/3')
      .set('Accept', 'application/json')
      .expect(201)    
  })
})
