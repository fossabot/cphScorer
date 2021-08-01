import { RankingType } from '@cph-scorer/model'
import { INestApplication } from '@nestjs/common'
import supertest from 'supertest'
import { PlayerHttpModule } from '../../src/player/player.http.module'
import { RoundHttpModule } from '../../src/round/round.http.module'
import { MatchHttpModule } from '../../src/match/match.http.module'
import connection from '../connection'
import { MatchDTO } from '../../src/match/DTO/match.dto'

let app: INestApplication
let match: MatchDTO

beforeAll(async () => {
  app = await connection(RoundHttpModule, PlayerHttpModule, MatchHttpModule)

  const { body } = await supertest.agent(app.getHttpServer())
    .get('/player')

  await Promise.all(body.slice(0, 4).map((x: any) => {
    return supertest.agent(app.getHttpServer())
      .post('/player/register')
      .send({ id: x.id, type: RankingType.SEN })
  }))

  await supertest.agent(app.getHttpServer())
    .post('/round/generate/1')

  match = (await supertest.agent(app.getHttpServer())
    .get('/round/1'))
    .body.matchs[0]
})

afterAll(async () => {
  await app.close()
})

describe('Match Controller', () => {
  it('PUT /, team one win', async () => {
    await supertest.agent(app.getHttpServer())
      .put('/match')
      .send({       
        match: match, 
        type: RankingType.SEN
      })
      .set('Accept', 'application/json')
      .expect(204)      
  })
})
