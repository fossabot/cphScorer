import { RankingProvider } from '../../providers/ranking.provider'
import { RankingType, Ranking } from '@cph-scorer/model'

export class GetRanking {
  constructor (private readonly rankingProvider: RankingProvider) { }

  public async exec (type: RankingType): Promise<Ranking[]> {
    return await this.rankingProvider.getRanking(type)
  }
}
