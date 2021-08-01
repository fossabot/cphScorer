import { RankingProvider } from '@cph-scorer/core'
import { Repository } from 'typeorm'
import { RankingEntity } from '../entity/ranking'
import { RankingType, Ranking, Player } from '@cph-scorer/model'
import { PlayerEntity } from '../entity/player'

export class RankingDao implements RankingProvider {
  constructor (private readonly rankingRepository: Repository<RankingEntity>) { }

  public async findRanking (id: string, type: RankingType): Promise<Ranking | null> {
    const res = (await this.rankingRepository.createQueryBuilder('ranking')
      .leftJoinAndSelect('ranking.players', 'players')
      .select(['ranking.id', 'ranking.participation', 'ranking.point', 'ranking.goalAverage', 'ranking.type', 'players.id'])
      .where('ranking.type = :type AND players.id = :id', { type, id })
      .getOne())

    if (res === undefined) return null
    return res.toRanking()
  }

  public async update (id: string, ranking: Partial<Ranking>): Promise<void> {
    const r = await this.rankingRepository.findOneOrFail({
      where: { id, type: ranking.type }
    })

    await this.rankingRepository.save(Object.assign(r, ranking))
  }

  public async getRanking (type: RankingType): Promise<Ranking[]> {
    return (await this.rankingRepository.createQueryBuilder('ranking')
      .leftJoinAndSelect('ranking.players', 'players')
      .select(['ranking.id', 'ranking.participation', 'ranking.point', 'ranking.goalAverage', 'players.firstName', 'players.id', 'players.lastName'])
      .where('ranking.type = :type', { type })
      .orderBy({
        'ranking.point': 'DESC',
        'ranking.goalAverage': 'DESC',
        'ranking.participation': 'ASC'
      })
      .getMany())
      .map(x => x.toRanking())
  }

  public async createRanking (player: Partial<Player>, type: RankingType): Promise<Ranking> {
    const ranking = new RankingEntity()
    const playerEntity = new PlayerEntity()
    playerEntity.fromPlayer(player)

    ranking.type = type
    ranking.players = [playerEntity]
    return (await this.rankingRepository.save(ranking)).toRanking()
  }
}
