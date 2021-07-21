import { getConnection } from 'typeorm'
import { RoundEntity } from '../../src/entity/round'
import connection from '../connection'
import {RoundDao} from '../../src/dao/round'

describe('Round dao', () => {
  let dao: RoundDao

  beforeAll(async () => {
    await connection.create()
    dao = new RoundDao(getConnection().getRepository(RoundEntity))
  })

  afterAll(async () => {
    await connection.close()
  })

  it('insert round', async ()=>{
    const round = await dao.insert(1)
    expect(round).toBeDefined()
    expect(round.roundNumber).toBe(1)   
  })

  it('list round', async ()=>{
    const round = await dao.getRound(1)
    expect(round).toBeDefined()
    expect(round.roundNumber).toBe(1)   
  })
})