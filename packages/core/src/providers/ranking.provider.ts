import { RankingType, Ranking, Player, uuid } from "@cph-scorer/model";

export interface RankingProvider {
  findRanking: (id: uuid, type: RankingType) => Promise<Ranking | null>;
  update: (id: uuid, ranking: Partial<Ranking>) => Promise<void>;
  getRanking: (type: RankingType) => Promise<Ranking[]>;
  createRanking: (
    player: Partial<Player>,
    type: RankingType
  ) => Promise<Ranking>;
}
