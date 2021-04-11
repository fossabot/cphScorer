import { getConnection } from 'typeorm'
import { MatchDao } from '../../src/dao/match'
import { MatchEntity } from '../../src/entity/match'
import { RoundEntity } from '../../src/entity/round'
import { TeamEntity } from '../../src/entity/team'
import connection from '../connection'

describe('Match dao', () => {
  let dao: MatchDao = null

  beforeAll(async (done) => {
    await connection.create()
    dao = new MatchDao(getConnection().getRepository(MatchEntity))
    done()
  })

  afterAll(async (done) => {
    await connection.close()
    done()
  })

  it('create match', async (done) => {
    const roundEntity = new RoundEntity()
    roundEntity.roundNumber = 2
    const round = await getConnection().getRepository(RoundEntity)
      .save(roundEntity)

    const teamEntity1 = new TeamEntity()
    const team1 = await getConnection().getRepository(TeamEntity)
      .save(teamEntity1)

    const teamEntity2 = new TeamEntity()
    const team2 = await getConnection().getRepository(TeamEntity)
      .save(teamEntity2)

    const match = await dao.insert([team1, team2], round)
    expect(match).toBeDefined()
    done()
  })
})