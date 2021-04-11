import { getConnection } from 'typeorm'
import { TeamDao } from '../../src/dao/team'
import { PlayerEntity } from '../../src/entity/player'
import { TeamEntity } from '../../src/entity/team'
import connection from '../connection'

describe('Team dao', () => {
  let dao: TeamDao = null
  let team: any = null

  beforeAll(async (done) => {
    await connection.create()
    dao = new TeamDao(getConnection().getRepository(TeamEntity))
    done()
  })

  afterAll(async (done) => {
    await connection.close()
    done()
  })

  it('insert team', async (done)=>{
    const player = await getConnection().getRepository(PlayerEntity).find()
    team = await dao.insert(player.slice(0,2))
    expect(team).toBeDefined()
    done()
  })

  it('update team', async (done)=>{
    const updTeam = await dao.update(team.id,13)
    expect(updTeam.id).toBe(team.id)
    expect(updTeam.score).toBe(13)
    done()
  })
})