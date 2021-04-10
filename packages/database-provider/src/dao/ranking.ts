import { RankingProvider } from '@cph-scorer/core'
import { Repository } from 'typeorm'
import { RankingEntity } from '../entity/ranking'
import { RankingType, Ranking } from '@cph-scorer/model'

export class RankingDao implements RankingProvider {
  constructor (private readonly rankingRepository: Repository<RankingEntity>) { }

  public async findRanking (id: string, type: RankingType): Promise<Ranking> {
    return (await this.rankingRepository.createQueryBuilder('ranking')
      .leftJoinAndSelect('ranking.players', 'players')
      .select(['ranking.id', 'ranking.participation', 'ranking.point', 'ranking.goalAverage', 'ranking.type', 'players.id'])
      .where('ranking.type = :type AND players.id = :id', { type, id })
      .getOneOrFail())
      .toRanking()
  }

  public async update (id: string, ranking: Partial<Ranking>): Promise<void> {
    const r = await this.findRanking(id, ranking.type as any)

    await this.rankingRepository.save(Object.assign(r, ranking))
  }

  public async getRanking (type: RankingType): Promise<Ranking[]> {
    return (await this.rankingRepository.createQueryBuilder('ranking')
      .leftJoinAndSelect('ranking.players', 'players')
      .select(['ranking.participation', 'ranking.point', 'ranking.goalAverage', 'players.firstName', 'players.lastName'])
      .where('ranking.type = :type', { type })
      .orderBy({
        'ranking.point': 'DESC',
        'ranking.goalAverage': 'DESC',
        'ranking.participation': 'ASC'
      })
      .getMany())
      .map(x => x.toRanking())
  }
}
