import { getConnection } from 'typeorm'
import { RoundEntity } from '../../src/entity/round'
import connection from '../connection'
import {RoundDao} from '../../src/dao/round'

describe('Round dao', () => {
  let dao: RoundDao = null

  beforeAll(async (done) => {
    await connection.create()
    dao = new RoundDao(getConnection().getRepository(RoundEntity))
    done()
  })

  afterAll(async (done) => {
    await connection.close()
    done()
  })

  it('insert round', async (done)=>{
    const round = await dao.insert(1)
    expect(round).toBeDefined()
    expect(round.roundNumber).toBe(1)   
    done()
  })

  it('list round', async (done)=>{
    const round = await dao.getRound(1)
    expect(round).toBeDefined()
    expect(round.roundNumber).toBe(1)   
    done()
  })
})