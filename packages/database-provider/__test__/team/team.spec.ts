import { getConnection } from 'typeorm'
import { TeamDao } from '../../src/dao/team'
import { PlayerEntity } from '../../src/entity/player'
import { TeamEntity } from '../../src/entity/team'
import connection from '../connection'

describe('Team dao', () => {
  let dao: TeamDao
  let team: any

  beforeAll(async () => {
    await connection.create()
    dao = new TeamDao(getConnection().getRepository(TeamEntity))
  })

  afterAll(async () => {
    await connection.close()
  })

  it('insert team', async ()=>{
    const player = await getConnection().getRepository(PlayerEntity).find()
    team = await dao.insert(player.slice(0,2))
    expect(team).toBeDefined()
  })

  it('update team', async ()=>{
    const updTeam = await dao.update(team.id,13)
    expect(updTeam.id).toBe(team.id)
    expect(updTeam.score).toBe(13)
  })
})