import { PlayerProvider } from "../../providers/player.provider";
import { RankingType, Ranking, Player } from "@cph-scorer/model";
import { PlayerUnknowException } from "../../errors/PlayerUnknow";
import { RankingProvider } from "../../providers/ranking.provider";

export class RegisterPlayer {
  constructor(
    private readonly playerProdvider: PlayerProvider,
    private readonly rankingProvider: RankingProvider
  ) {}

  public async exec(id: string, type: RankingType): Promise<void> {
    let idRanking = null;
    const player: Player = await this.playerProdvider.update(id, {
      register: true,
    });

    if (player === null) throw new PlayerUnknowException(id);

    const lastRanking = await this.rankingProvider.findRanking(id, type);

    if (lastRanking === null || lastRanking === undefined) {
      idRanking = (await this.rankingProvider.createRanking(player, type)).id;
    } else {
      idRanking = lastRanking.id;
    }

    const ranking: Partial<Ranking> = {
      type,
      id: idRanking,
      participation: (lastRanking?.participation ?? 0) + 1, // eslint-disable-line
      point: lastRanking?.point ?? 0,
      goalAverage: lastRanking?.goalAverage ?? 0,
    };
    await this.rankingProvider.update(ranking.id as string, ranking);
  }
}
