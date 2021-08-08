import {RankingHttpModule} from '../../src/ranking/ranking.http.module'
import { INestApplication } from '@nestjs/common'
import supertest from 'supertest'
import connection from '../connection'
import { RankingType } from '@cph-scorer/model'

let app: INestApplication

beforeAll(async () => {
  app = await connection(RankingHttpModule)
})

afterAll(async () => {
  await app.close()
})

describe('Ranking Controller', () => {
  it('GET /ranking/{type}, SEN', async () => {
    const { body } = await supertest.agent(app.getHttpServer())
      .get(`/ranking/${RankingType.SEN}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)

    expect(body.length).toBe(4)    
  })

  it('GET /ranking/{type}, VET', async () => {
    const { body } = await supertest.agent(app.getHttpServer())
      .get(`/ranking/${RankingType.VET}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)

    expect(body.length).toBe(2)    
  })
})
