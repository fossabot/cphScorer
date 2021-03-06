import { getConnection } from "typeorm"
import connection from "../connection"
import { RankingDao } from '../../src/dao/ranking'
import { PlayerDao } from '../../src/dao/player'
import { RankingEntity } from "../../src/entity/ranking"
import { PlayerEntity } from "../../src/entity/player"
import { RankingType } from "@cph-scorer/model"


describe('Ranking dao', () => {
  let dao: RankingDao
  let idSen: any
  let idVet: any
  let toCreate: any
  let rankingSen: any
  let rankingVet: any  

  beforeAll(async () => {
    await connection.create()
    const playerDao = new PlayerDao(getConnection().getRepository(PlayerEntity))

    await playerDao.list().then(x => {
      idSen = x[0].id
      idVet = x[4].id      
      toCreate = x[8].id
    })

    dao = new RankingDao(getConnection().getRepository(RankingEntity))

    rankingSen = await dao.getRanking(RankingType.SEN)    
    rankingVet = await dao.getRanking(RankingType.VET)    
  })

  afterAll(async () => {
    await connection.close()
  })

  it('find ranking SEN', async () => {
    const ranking  = (await dao.findRanking(idSen, RankingType.SEN)) as any

    expect(ranking.type).toBe(RankingType.SEN)
    expect(ranking.players[0].id).toBe(idSen)
  })

  it('find ranking VET', async () => {
    const ranking = (await dao.findRanking(idVet, RankingType.VET)) as any

    expect(ranking.type).toBe(RankingType.VET)
    expect(ranking.players[0].id).toBe(idVet)
  })

  it('update ranking SEN', async () => {
    await dao.update(rankingSen[0].id, { point: 3, goalAverage: 10, type: RankingType.SEN })
    const ranking = (await dao.findRanking(rankingSen[0].players[0].id, RankingType.SEN)) as any

    expect(ranking.point).toBe(3)
    expect(ranking.goalAverage).toBe(10)
  })

  it('update ranking VET', async () => {
    await dao.update(rankingVet[0].id, { point: 3, goalAverage: 10, type: RankingType.VET })
    const ranking = (await dao.findRanking(rankingVet[0].players[0].id, RankingType.VET)) as any

    expect(ranking.point).toBe(3)
    expect(ranking.goalAverage).toBe(10)
  })

  it('get ranking SEN', async () => {
    await dao.update(rankingSen[1].id, { point: 2, goalAverage: 10, participation: 2, type: RankingType.SEN })
    await dao.update(rankingSen[2].id, { point: 2, goalAverage: 10, type: RankingType.SEN })

    const ranking = await dao.getRanking(RankingType.SEN)

    expect(ranking.length).toBe(4)
    expect(ranking.findIndex(x => x.players[0].firstName === 'player0')).toBe(0)
    expect(ranking.findIndex(x => x.players[0].firstName === 'player1')).toBe(2)
    expect(ranking.findIndex(x => x.players[0].firstName === 'player2')).toBe(1)
    expect(ranking.findIndex(x => x.players[0].firstName === 'player3')).toBe(3)

  })

  it('get ranking VET', async () => {
    const ranking = await dao.getRanking(RankingType.VET)
    expect(ranking.length).toBe(2)
  })

  it('create new ranking', async () => {
    await dao.createRanking({ id: toCreate }, RankingType.VET)
    const list = await dao.getRanking(RankingType.VET)
    expect(list.length).toBe(3)
  })
})