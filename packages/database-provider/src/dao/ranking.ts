import { RankingProvider } from '@cph-scorer/core'
import { Repository } from 'typeorm'
import { RankingEntity } from '../entity/ranking'
import { RankingType, Ranking } from '@cph-scorer/model'

export class RankingDao implements RankingProvider {
  constructor (private readonly rankingRepository: Repository<RankingEntity>) { }

  public async findRanking (id: string, type: RankingType): Promise<Ranking> {
    return (await this.rankingRepository
      .findOneOrFail({ select: ['participation', 'point', 'goalAverage'], where: { type, id } }))
      .toRanking()
  }

  public async update (id: string, ranking: Partial<Ranking>): Promise<void> {
    const r = await this.findRanking(id, ranking.type as any)

    await this.rankingRepository.save(Object.assign(r, ranking))
  }

  public async getRanking (type: RankingType): Promise<Ranking[]> {
    const res = (await this.rankingRepository
      .find({
        relations: ['players'],
        where: { type },
        order: { point: 'DESC', goalAverage: 'DESC', participation: 'ASC' }
      }))
      .map(x => x.toRanking())

    return res
  }
}
