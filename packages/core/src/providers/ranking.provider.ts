import { RankingType, Ranking } from '@cph-scorer/model'

export interface RankingProvider {
  findRanking: (id: string, type: RankingType) => Promise<Ranking>
  update: (id: string, ranking: Partial<Ranking>) => Promise<void>
  getRanking: (type: RankingType) => Promise<Ranking[]>
}
