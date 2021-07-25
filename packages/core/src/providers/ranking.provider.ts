import { RankingType, Ranking, Player } from '@cph-scorer/model'

export interface RankingProvider {
  findRanking: (id: string, type: RankingType) => Promise<Ranking | null>
  update: (id: string, ranking: Partial<Ranking>) => Promise<void>
  getRanking: (type: RankingType) => Promise<Ranking[]>
  createRanking: (player: Partial<Player>, type: RankingType) => Promise<void>
}
