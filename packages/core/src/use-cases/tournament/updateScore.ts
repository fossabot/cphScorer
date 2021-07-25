import { RankingProvider } from '../../providers/ranking.provider'
import { Match, RankingType, Team } from '@cph-scorer/model'
import { TeamProvider } from '../../providers/team.provider'
import { PlayerUnknowException } from '../../errors/PlayerUnknow'

export class UpdateScore {
  constructor (private readonly rankingProvider: RankingProvider, private readonly teamProvider: TeamProvider) { }

  public async exec (match: Match, type: RankingType): Promise<void> {
    await Promise.all([
      this.teamProvider.update(match.teamOne.id, match.teamOne.score),
      this.teamProvider.update(match.teamTwo.id, match.teamTwo.score)
    ])

    if (match.teamOne.score === 13) {
      await Promise.all([
        this.update(match.teamOne, match.teamOne.score - match.teamTwo.score, 3, type),
        this.update(match.teamTwo, match.teamTwo.score - match.teamOne.score, 1, type)
      ])
    } else {
      await Promise.all([
        this.update(match.teamTwo, match.teamTwo.score - match.teamOne.score, 3, type),
        this.update(match.teamOne, match.teamOne.score - match.teamTwo.score, 1, type)
      ])
    }
  }

  private async update (team: Team, goalAverage: number, point: number, type: RankingType): Promise<void> {
    team.players.every(async p => {
      const rank = await this.rankingProvider.findRanking(p.id, type)

      if (rank === null) throw new PlayerUnknowException(p.id)

      rank.goalAverage += goalAverage
      rank.point += point

      await this.rankingProvider.update(rank.id, rank)
    })
  }
}
