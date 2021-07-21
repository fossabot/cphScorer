import connection from '../connection'
import { PlayerDao } from '../../src/dao/player'
import { getConnection } from 'typeorm'
import { PlayerEntity } from '../../src/entity/player'

describe('Player dao', () => {
  let dao: PlayerDao

  beforeAll(async () => {
    await connection.create()
    dao = new PlayerDao(getConnection().getRepository(PlayerEntity))
  })

  afterAll(async () => {
    await connection.close()
  })

  it('list player', async () => {
    const list = await dao.list()
    expect(list.length).toBe(16)
  })

  it('add player', async () => {
    const player = await dao.add({ firstName: 'toto', lastName: 'tata' })
    expect(player.firstName).toBe('toto')
    expect(player.lastName).toBe('tata')
    expect(player.register).toBeFalsy()

    const list = await dao.list()
    expect(list.length).toBe(17)
  })

  it('update player', async () => {
    const id = await dao.list().then(list => list[0].id)
    const player = await dao.update(id, { firstName: 'titi' })

    expect(player.id).toBe(id)
    expect(player.firstName).toBe('titi')
  })

  it('update unknow player', async () => {
    const player = await dao.update('ffffffff-ffff-ffff-ffff-ffffffffffff', { firstName: 'titi' })
    expect(player).toBeNull()
  })

  it('list register player', async () => {
    const [p1, p2, _] = await dao.list()
    await dao.update(p1.id, { register: true })
    await dao.update(p2.id, { register: true })

    const list = await dao.listRegister()
    expect(list.length).toBe(2)
  })
})