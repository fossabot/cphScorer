import { PlayerProvider, TeamProvider, RankingProvider, RoundProvider, MatchProvider } from "../../src"
import { Player, Team, Ranking, RankingType, Round, Match } from "@cph-scorer/model"

class mockPlayerProvider implements PlayerProvider {
  public players = [
    new Player({ id: '0', register: false }),
    new Player({ id: '1', register: false })
  ]

  async list(): Promise<Player[]> { return [] }
  async add(player: Partial<Player>): Promise<Player> { return { id: '', firstName: '', lastName: '', register: false } }

  async listRegister(): Promise<Player[]> {
    return this.players
  }

  async update(id: string, player: Partial<Player>): Promise<Player> {
    const res = this.players[
      this.players.findIndex(x => x.id === id)
    ] ?? null

    return res === null ? res : { ...res, ...player } as Player
  }
}

class mockTeamProvider implements TeamProvider {
  public teams = [
    new Team({ id: '1', score: 0, players: [new Player({ id: '1' })] }),
    new Team({ id: '2', score: 0, players: [new Player({ id: '3' })] }),
  ]

  async insert(players: Player[]): Promise<Team> {
    const team = new Team({ players })
    this.teams.push(team)
    return team
  }

  async update(id: string, score: number): Promise<Team> {
    const t = this.teams.find(t => t.id === id) as Team
    t.score = score
    return t
  }
}

class mockRanginkProvider implements RankingProvider {
  public rankings = [
    new Ranking({
      id: '1',
      players: [new Player({ id: '1' })],
      point: 10,
      goalAverage: 10,
      participation: 1
    }),
    new Ranking({
      id: '3',
      players: [new Player({ id: '3' })],
      point: 10,
      goalAverage: 10,
      participation: 1
    })
  ]

  async findRanking(id: string, type: RankingType): Promise<Ranking> {
    const res = this.rankings.find(
      x => x.players?.filter(p => p.id === id).length !== 0
    ) || null

    return res as Ranking
  }

  async update(id: string, ranking: Partial<Ranking>): Promise<void> {
    const res = this.rankings.findIndex(
      x => x.players.filter(p => p.id === id).length !== 0
    )
    if (res === -1) this.rankings.push(new Ranking({
      id: '2',
      ...ranking,
      players: []
    }))
    else {
      this.rankings[res] = { ...this.rankings[res], ...ranking }
    }
  }

  async getRanking(type: RankingType): Promise<Ranking[]> { return [] }
  async createRanking(player: Partial<Player>, type: RankingType) { return new Ranking({id: '2'}) }
}

class mockRoundProvider implements RoundProvider {
  public round = []

  async insert(roundNumber: number): Promise<Round> {
    const round = new Round({ roundNumber, id: '' + roundNumber }) as Round
    this.round.push(round as never)
    return round
  }

  async getRound(roundNumber: number): Promise<Round> { return new Round() }
}

class mockMatchProvider implements MatchProvider {
  public match = []

  async insert(teams: Team[], round: Round): Promise<Match> {
    const match = new Match({ teamOne: teams[0], teamTwo: teams[1], round }) as Match
    this.match.push(match as never)
    return match
  }
}

export { mockPlayerProvider, mockTeamProvider, mockRanginkProvider, mockRoundProvider, mockMatchProvider }