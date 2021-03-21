import { PlayerProvider, RankingProvider, RegisterPlayer, PlayerUnknowException, TeamProvider, UpdateScore } from "../../src"
import { Ranking, Team, RankingType, Player } from "../../../model/src"
import { Match } from "@cph-scorer/model"

class mockPlayerProvider implements PlayerProvider {
  private players = [
    new Player({ id: '0', register: false }),
    new Player({ id: '1', register: false })
  ]

  list(): Promise<Player[]> { return null }
  add(player: Partial<Player>): Promise<Player> { return null }
  listRegister(): Promise<Player[]> { return null }

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

  insert: (player: Player[]) => Promise<Team>
  async update(id: string, score: number): Promise<Team> {    
    const t = this.teams.find(t => t.id === id)
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

    return res
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
}

describe('Torunament use case', () => {

  describe('Register player', () => {
    const rank = new mockRanginkProvider()
    const player = new mockPlayerProvider()

    const useCase = new RegisterPlayer(player, rank)

    it('Register unknow player', () => {
      return useCase.exec('00', RankingType.SEN).catch(e => expect(e).toBeInstanceOf(PlayerUnknowException))
    })

    it('Register new player', async (done) => {
      await useCase.exec('0', RankingType.SEN)

      const r = rank.rankings.find(x => x.id === '2')

      expect(rank.rankings.length).toBe(3)
      expect(r).toBeDefined()
      expect(r.participation).toBe(1)
      expect(r.goalAverage).toBe(0)
      expect(r.point).toBe(0)

      done()
    })

    it('Register old player', async (done) => {
      await useCase.exec('1', RankingType.SEN)

      const r = rank.rankings.find(x => x.id === '1')

      expect(rank.rankings.length).toBe(3)
      expect(r).toBeDefined()
      expect(r.participation).toBe(2)
      expect(r.goalAverage).toBe(10)
      expect(r.point).toBe(10)

      done()
    })

    it('Registing player call provider', async (done) => {
      const spyFind = jest.spyOn(rank, 'findRanking')
      const spyUpdateRank = jest.spyOn(rank, 'update')
      const spyUpdatePlayer = jest.spyOn(player, 'update')

      await useCase.exec('0', RankingType.SEN)

      expect(spyFind).toHaveBeenCalled()
      expect(spyUpdateRank).toHaveBeenCalled()
      expect(spyUpdatePlayer).toHaveBeenCalled()

      done()
    })
  })

  describe('Update score', () => {
    const rank = new mockRanginkProvider()
    const team = new mockTeamProvider()

    const useCase = new UpdateScore(rank, team)

    it('Team 1 win', async (done) => {            
      await useCase.exec(new Match({
        teamOne: new Team({ id: '1', score: 13, players: [new Player({ id: '1' })] }),
        teamTwo: new Team({ id: '2', score: 1, players: [new Player({ id: '3' })] }),
      }), RankingType.SEN)

      expect(team.teams.find(x => x.id === '1').score).toBe(13)
      expect(team.teams.find(x => x.id === '2').score).toBe(1)
      
      expect((await rank.findRanking('1',RankingType.SEN)).point).toBe(13)
      expect((await rank.findRanking('1',RankingType.SEN)).goalAverage).toBe(22)

      expect((await rank.findRanking('3',RankingType.SEN)).point).toBe(11)
      expect((await rank.findRanking('3',RankingType.SEN)).goalAverage).toBe(-2)

      done()
    })

    it('Team 2 win', async (done) => {            
      await useCase.exec(new Match({
        teamOne: new Team({ id: '1', score: 1, players: [new Player({ id: '1' })] }),
        teamTwo: new Team({ id: '2', score: 13, players: [new Player({ id: '3' })] }),
      }), RankingType.SEN)

      expect(team.teams.find(x => x.id === '1').score).toBe(1)
      expect(team.teams.find(x => x.id === '2').score).toBe(13)
      
      expect((await rank.findRanking('1',RankingType.SEN)).point).toBe(14)
      expect((await rank.findRanking('1',RankingType.SEN)).goalAverage).toBe(10)

      expect((await rank.findRanking('3',RankingType.SEN)).point).toBe(14)
      expect((await rank.findRanking('3',RankingType.SEN)).goalAverage).toBe(10)

      done()
    })
  })
})