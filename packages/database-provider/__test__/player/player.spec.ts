import connection from '../connection'
import { PlayerDao } from '../../src/dao/player'
import { getConnection } from 'typeorm'
import { PlayerEntity } from '../../src/entity/player'

describe('Player dao', () => {
  let dao: PlayerDao

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

  it('add player', async (done) => {
    const player = await dao.add({ firstName: 'toto', lastName: 'tata' })
    expect(player.firstName).toBe('toto')
    expect(player.lastName).toBe('tata')
    expect(player.register).toBeFalsy()

    const list = await dao.list()
    expect(list.length).toBe(17)
    done()
  })

  it('update player', async (done) => {
    const id = await dao.list().then(list => list[0].id)
    const player = await dao.update(id, { firstName: 'titi' })

    expect(player.id).toBe(id)
    expect(player.firstName).toBe('titi')
    done()
  })

  it('update unknow player', async (done) => {
    const player = await dao.update('ffffffff-ffff-ffff-ffff-ffffffffffff', { firstName: 'titi' })
    expect(player).toBeNull()
    done()
  })

  it('list register player', async (done) => {
    const [p1, p2, _] = await dao.list()
    await dao.update(p1.id, { register: true })
    await dao.update(p2.id, { register: true })

    const list = await dao.listRegister()
    expect(list.length).toBe(2)
    done()
  })
})