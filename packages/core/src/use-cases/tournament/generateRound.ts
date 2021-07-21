import { chain, chunk, intersection, flatten } from 'lodash'
import { Observable, lastValueFrom } from 'rxjs'
import { retry } from 'rxjs/operators'
import { Player } from '@cph-scorer/model'
import { PlayerProvider } from '../../providers/player.provider'
import { MaxCallError } from '../../errors/MaxCallError'
import { RoundProvider } from '../../providers/round.provider'
import { TeamProvider } from '../../providers/team.provider'
import { MatchProvider } from '../../providers/match.provider'

export class GenerateRound {
  constructor (
    private readonly playerProvider: PlayerProvider,
    private readonly roundProvider: RoundProvider,
    private readonly teamProvider: TeamProvider,
    private readonly matchProvider: MatchProvider
  ) { }

  public async exec (numberOfRound: number): Promise<void> {
    const register = await this.playerProvider.listRegister()
    const rounds = await lastValueFrom(
      this.generate(numberOfRound, register)
        .pipe(retry(5))
    )

    for (let i = 0; i < rounds.length; i++) {
      const round = await this.roundProvider.insert(i + 1)

      for (const match of rounds[i]) {
        const dbTeam = []

        for (const team of match) {
          dbTeam.push(
            await this.teamProvider.insert(
              register.filter(x => team.includes(x.id))
            )
          )
        }

        await this.matchProvider.insert(dbTeam, round)
      }
    }
  }

  private generate (numberOfRound: number, register: Player[]): Observable<Array<Array<[string[], string[]]>>> {
    return new Observable(sub => {
      const oldTeammate = this.toMap(register)

      const res = []

      for (let i = 0; i < numberOfRound; i++) { res.push(this.drawRound(oldTeammate)) }

      sub.next(res)
      sub.complete()
    })
  }

  /**
   * Convert register array to Record<uuid,uuid[]>
   * @param players list of register player
   * @returns Record<uuid,uuid[]>
   */
  private toMap (players: Player[]): Record<string, string[]> {
    return chain(players)
      .keyBy('id')
      .mapValues(() => new Array<string>())
      .value()
  }

  /**
   * Generate one round
   * @param oldTeammate
   * @returns round
   */
  private drawRound (oldTeammate: Record<string, string[]>): Array<[string[], string[]]> {
    const uuids = Object.keys(oldTeammate)
    const teamSize3 = uuids.length % 4
    const teamSize2 = (uuids.length - teamSize3 * 3) / 2
    const teams = []

    for (let i = 0; i < teamSize3; i++) {
      teams.push(this.random(oldTeammate, uuids, 3))
    }

    for (let i = 0; i < teamSize2; i++) {
      teams.push(this.random(oldTeammate, uuids, 2))
    }
    return chunk(teams, 2) as []
  }

  /**
   * Pick n uuid and generate a random team of size n
   * @param oldTeammate
   * @param uuids
   * @param length
   * @param limit - interal param limit of retry to block infinitie loop
   * @returns team
   */
  private random (oldTeammate: Record<string, string[]>, ids: string[], length: number, limit = 50): string[] {
    // block inifitie loop
    if (limit === 0) throw new MaxCallError(50)

    // generate team
    const team = this.shuffle(ids).slice(0, length)

    // get old teammate of team member
    const olds: string[][] = []
    for (let i = 0; i < length; i++) olds.push(oldTeammate[team[i]])

    // check if team not already exist
    if (intersection(team, flatten(olds)).length === 0) {
      ids.splice(0, length)
      team.forEach((mate: string) => {
        team.filter((x: string) => x !== mate).forEach((x: string) => oldTeammate[x].push(mate))
      })
      return team
    } else {
      return this.random(oldTeammate, ids, length, limit - 1)
    }
  }

  private shuffle (tab: any[]): any[] {
    let i = tab.length
    let j = 0

    while (i !== 0) {
      j = (Math.random() * (--i + 1)) | 0;
      [tab[i], tab[j]] = [tab[j], tab[i]]
    }
    return tab
  }
}
