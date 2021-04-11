import { MatchProvider } from '@cph-scorer/core'
import { Team, Round, Match } from '@cph-scorer/model'
import { Repository } from 'typeorm'
import { MatchEntity } from '../entity/match'
import { RoundEntity } from '../entity/round'
import { TeamEntity } from '../entity/team'

export class MatchDao implements MatchProvider {
  constructor (private readonly matchRepository: Repository<MatchEntity>) {}

  public async insert (teams: Team[], round: Round): Promise<Match> {
    const match = new MatchEntity()
    const roundEntity = new RoundEntity()
    roundEntity.fromRound(round)

    const team1 = new TeamEntity()
    team1.fromTeam(teams[0])
    const team2 = new TeamEntity()
    team2.fromTeam(teams[1])

    match.round = roundEntity
    match.teamOne = team1
    match.teamTwo = team2

    return (await this.matchRepository.save(match)).toMatch()
  }
}
