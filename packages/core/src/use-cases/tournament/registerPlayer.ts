import { PlayerProvider } from '../../providers/player.provider'
import { RankingType, Ranking, Player } from '@cph-scorer/model'
import { PlayerUnknowException } from '../../errors/PlayerUnknow'
import { RankingProvider } from '../../providers/ranking.provider'

export class RegisterPlayer {
  constructor (private readonly playerProdvider: PlayerProvider, private readonly rankingProvider: RankingProvider) { }

  public async exec (id: string, type: RankingType): Promise<void> {
    const player: Player = await this.playerProdvider.update(id, { register: true })

    if (player === null) throw new PlayerUnknowException(id)

    const lastRanking = await this.rankingProvider.findRanking(id, type)

    const ranking: Partial<Ranking> = {
      type,
      participation: (lastRanking?.participation ?? 0) + 1, // eslint-disable-line
      point: lastRanking?.point ?? 0,
      goalAverage: lastRanking?.goalAverage ?? 0
    }

    await this.rankingProvider.update(id, ranking)
  }
}
