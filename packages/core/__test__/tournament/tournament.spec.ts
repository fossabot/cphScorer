import { RegisterPlayer, PlayerUnknowException, TeamProvider, UpdateScore, GenerateRound, MaxCallError, GetRound } from "../../src"
import { Match, Team, RankingType, Player } from "@cph-scorer/model"

import { mockPlayerProvider, mockTeamProvider, mockRanginkProvider, mockRoundProvider, mockMatchProvider } from '../__mocks__/provider'

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

  describe('generate round', () => {
    const player = new mockPlayerProvider()
    const team = new mockTeamProvider()
    const round = new mockRoundProvider()
    const match = new mockMatchProvider()

    beforeEach(() => {
      player.players = [
        new Player({ id: '0', register: true }),
        new Player({ id: '1', register: true }),
        new Player({ id: '3', register: true }),
        new Player({ id: '5', register: true })
      ]
      team.teams = []
      match.match = []
      round.round = []
    })

    const useCase = new GenerateRound(player, round, team, match)

    it('Imposible generation', () => {
      return useCase.exec(4).catch(e => expect(e).toBeInstanceOf(MaxCallError))
    })

    it('Correct generation team size 2', async (done) => {
      await useCase.exec(3)

      expect(team.teams.length).toBe(6)
      expect(match.match.length).toBe(3)
      expect(round.round.length).toBe(3)

      done()
    })

    it('Correct generation team size 3', async (done) => {
      player.players.push(new Player({ id: '6', register: true }))
      await useCase.exec(1)

      expect(team.teams.length).toBe(2)
      expect(match.match.length).toBe(1)
      expect(round.round.length).toBe(1)

      done()
    })

    it('Get round', async (done)=>{
      const spy = jest.spyOn(round, 'getRound')

      await new GetRound(round).exec(1)

      expect(spy).toHaveBeenCalled()
      
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

      expect((await rank.findRanking('1', RankingType.SEN)).point).toBe(13)
      expect((await rank.findRanking('1', RankingType.SEN)).goalAverage).toBe(22)

      expect((await rank.findRanking('3', RankingType.SEN)).point).toBe(11)
      expect((await rank.findRanking('3', RankingType.SEN)).goalAverage).toBe(-2)

      done()
    })

    it('Team 2 win', async (done) => {
      await useCase.exec(new Match({
        teamOne: new Team({ id: '1', score: 1, players: [new Player({ id: '1' })] }),
        teamTwo: new Team({ id: '2', score: 13, players: [new Player({ id: '3' })] }),
      }), RankingType.SEN)

      expect(team.teams.find(x => x.id === '1').score).toBe(1)
      expect(team.teams.find(x => x.id === '2').score).toBe(13)

      expect((await rank.findRanking('1', RankingType.SEN)).point).toBe(14)
      expect((await rank.findRanking('1', RankingType.SEN)).goalAverage).toBe(10)

      expect((await rank.findRanking('3', RankingType.SEN)).point).toBe(14)
      expect((await rank.findRanking('3', RankingType.SEN)).goalAverage).toBe(10)

      done()
    })
  })
})