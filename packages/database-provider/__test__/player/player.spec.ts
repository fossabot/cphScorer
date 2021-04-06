import connection from '../connection'
import { PlayerDao } from '../../src/dao/player'
import { getConnection } from 'typeorm'
import { PlayerEntity } from '../../src/entity/player'

describe('Player dao', () => {
  let dao: PlayerDao = null

  beforeAll(async (done) => {
    await connection.create()
    dao = new PlayerDao(getConnection().getRepository(PlayerEntity))
    done()
  })

  afterAll(async (done) => {
    await connection.close()
    done()
  })

  it('list player', async (done) => {
    const list = await dao.list()    
    expect(list.length).toBe(16)    
    done()
  })
})