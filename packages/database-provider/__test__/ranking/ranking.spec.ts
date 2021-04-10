import { getConnection } from "typeorm"
import connection from "../connection"
import { RankingDao } from '../../src/dao/ranking'
import { PlayerDao } from '../../src/dao/player'
import { RankingEntity } from "../../src/entity/ranking"
import { PlayerEntity } from "../../src/entity/player"
import { RankingType } from "@cph-scorer/model"


describe('Ranking dao', () => {
  let dao: RankingDao = null
  let idSen = null
  let idVet = null
  const toRanking = []

  beforeAll(async (done) => {
    await connection.create()
    const playerDao = new PlayerDao(getConnection().getRepository(PlayerEntity))

    idSen = await playerDao.list().then(x => x[0].id)
    idVet = await playerDao.list().then(x => x[4].id)

    toRanking.push(await playerDao.list().then(x => x[1].id))
    toRanking.push(await playerDao.list().then(x => x[3].id))

    dao = new RankingDao(getConnection().getRepository(RankingEntity))
    done()
  })

  afterAll(async (done) => {
    await connection.close()
    done()
  })

  it('find ranking SEN', async (done) => {
    const ranking = await dao.findRanking(idSen, RankingType.SEN)

    expect(ranking.type).toBe(RankingType.SEN)
    expect(ranking.players[0].id).toBe(idSen)
    done()
  })

  it('find ranking VET', async (done) => {
    const ranking = await dao.findRanking(idVet, RankingType.VET)

    expect(ranking.type).toBe(RankingType.VET)
    expect(ranking.players[0].id).toBe(idVet)
    done()
  })

  it('update ranking SEN', async (done) => {
    await dao.update(idSen, { point: 3, goalAverage: 10, type: RankingType.SEN })
    const ranking = await dao.findRanking(idSen, RankingType.SEN)

    expect(ranking.point).toBe(3)
    expect(ranking.goalAverage).toBe(10)
    done()
  })

  it('update ranking VET', async (done) => {
    await dao.update(idVet, { point: 3, goalAverage: 10, type: RankingType.VET })
    const ranking = await dao.findRanking(idVet, RankingType.VET)

    expect(ranking.point).toBe(3)
    expect(ranking.goalAverage).toBe(10)
    done()
  })

  it('get ranking SEN', async (done) => {
    await dao.update(toRanking[0], { point: 2, goalAverage: 10, participation: 2, type: RankingType.SEN })
    await dao.update(toRanking[1], { point: 2, goalAverage: 10, type: RankingType.SEN })

    const ranking = await dao.getRanking(RankingType.SEN)

    expect(ranking.length).toBe(4)    
    expect(ranking.findIndex(x => x.players[0].firstName === 'player0')).toBe(0)
    expect(ranking.findIndex(x => x.players[0].firstName === 'player1')).toBe(2)
    expect(ranking.findIndex(x => x.players[0].firstName === 'player2')).toBe(3)
    expect(ranking.findIndex(x => x.players[0].firstName === 'player3')).toBe(1)

    done()
  })

  it('get ranking VET', async (done) => {
    const ranking = await dao.getRanking(RankingType.VET)
    expect(ranking.length).toBe(2)
    done()
  })
})