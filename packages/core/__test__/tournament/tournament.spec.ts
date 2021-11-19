import { RegisterPlayer, PlayerUnknowException, TeamProvider, UpdateScore, GenerateRound, MaxCallError, GetRound, GetRanking } from "../../src"
import { Match, Team, RankingType, Player } from "@cph-scorer/model"

import { mockPlayerProvider, mockTeamProvider, mockRanginkProvider, mockRoundProvider, mockMatchProvider } from '../__mocks__/provider'

describe('Torunament use case', () => {

  describe('Register player', () => {
    const rank = new mockRanginkProvider()
    const player = new mockPlayerProvider()

    const useCase = new RegisterPlayer(player, rank)

    it('Register unknow player', () => {
      return useCase.exec('00-a-a-a-a', RankingType.SEN).catch(e => expect(e).toBeInstanceOf(PlayerUnknowException))
    })

    it('Register new player', async () => {
      await useCase.exec('0-a-a-a-a', RankingType.SEN)

      const r = rank.rankings.find(x => x.id === '2-a-a-a-a')

      expect(rank.rankings.length).toBe(3)
      expect(r).toBeDefined()
      expect(r?.participation).toBe(1)
      expect(r?.goalAverage).toBe(0)
      expect(r?.point).toBe(0)
    })

    it('Register old player', async () => {
      await useCase.exec('1-a-a-a-a', RankingType.SEN)

      const r = rank.rankings.find(x => x.id === '1-a-a-a-a')

      expect(rank.rankings.length).toBe(3)
      expect(r).toBeDefined()
      expect(r?.participation).toBe(2)
      expect(r?.goalAverage).toBe(10)
      expect(r?.point).toBe(10)
    })

    it('Registing player call provider', async () => {
      const spyFind = jest.spyOn(rank, 'findRanking')
      const spyUpdateRank = jest.spyOn(rank, 'update')
      const spyUpdatePlayer = jest.spyOn(player, 'update')

      await useCase.exec('0-a-a-a-a', RankingType.SEN)

      expect(spyFind).toHaveBeenCalled()
      expect(spyUpdateRank).toHaveBeenCalled()
      expect(spyUpdatePlayer).toHaveBeenCalled()
    })
  })

  describe('generate round', () => {
    const player = new mockPlayerProvider()
    const team = new mockTeamProvider()
    const round = new mockRoundProvider()
    const match = new mockMatchProvider()

    beforeEach(() => {
      player.players = [
        new Player({ id: '0-a-a-a-a', register: true }),
        new Player({ id: '1-a-a-a-a', register: true }),
        new Player({ id: '3-a-a-a-a', register: true }),
        new Player({ id: '5-a-a-a-a', register: true })
      ]
      team.teams = []
      match.match = []
      round.round = []
    })

    const useCase = new GenerateRound(player, round, team, match)

    it('Imposible generation', () => {
      return useCase.exec(4).catch(e => expect(e).toBeInstanceOf(MaxCallError))
    })

    it('Correct generation team size 2', async () => {
      await useCase.exec(3)

      expect(team.teams.length).toBe(6)
      expect(match.match.length).toBe(3)
      expect(round.round.length).toBe(3)
    })

    it('Correct generation team size 3', async () => {
      player.players.push(new Player({ id: '6-a-a-a-a', register: true }))
      await useCase.exec(1)

      expect(team.teams.length).toBe(2)
      expect(match.match.length).toBe(1)
      expect(round.round.length).toBe(1)
    })

    it('Get round', async ()=>{
      const spy = jest.spyOn(round, 'getRound')

      await new GetRound(round).exec(1)

      expect(spy).toHaveBeenCalled()
    })
  })

  describe('Update score', () => {
    const rank = new mockRanginkProvider()
    const team = new mockTeamProvider()

    const useCase = new UpdateScore(rank, team)

    it('Team 1 win', async () => {
      await useCase.exec(new Match({
        teamOne: new Team({ id: '1-a-a-a-a', score: 13, players: [new Player({ id: '1-a-a-a-a' })] }),
        teamTwo: new Team({ id: '2-a-a-a-a', score: 1, players: [new Player({ id: '3-a-a-a-a' })] }),
      }), RankingType.SEN)

      expect(team.teams.find(x => x.id === '1-a-a-a-a')?.score).toBe(13)
      expect(team.teams.find(x => x.id === '2-a-a-a-a')?.score).toBe(1)

      expect((await rank.findRanking('1-a-a-a-a', RankingType.SEN)).point).toBe(13)
      expect((await rank.findRanking('1-a-a-a-a', RankingType.SEN)).goalAverage).toBe(22)

      expect((await rank.findRanking('3-a-a-a-a', RankingType.SEN)).point).toBe(11)
      expect((await rank.findRanking('3-a-a-a-a', RankingType.SEN)).goalAverage).toBe(-2)
    })

    it('Team 2 win', async () => {
      await useCase.exec(new Match({
        teamOne: new Team({ id: '1-a-a-a-a', score: 1, players: [new Player({ id: '1-a-a-a-a' })] }),
        teamTwo: new Team({ id: '2-a-a-a-a', score: 13, players: [new Player({ id: '3-a-a-a-a' })] }),
      }), RankingType.SEN)

      expect(team.teams.find(x => x.id === '1-a-a-a-a')?.score).toBe(1)
      expect(team.teams.find(x => x.id === '2-a-a-a-a')?.score).toBe(13)

      expect((await rank.findRanking('1-a-a-a-a', RankingType.SEN)).point).toBe(14)
      expect((await rank.findRanking('1-a-a-a-a', RankingType.SEN)).goalAverage).toBe(10)

      expect((await rank.findRanking('3-a-a-a-a', RankingType.SEN)).point).toBe(14)
      expect((await rank.findRanking('3-a-a-a-a', RankingType.SEN)).goalAverage).toBe(10)
    })
  })

  it('Get ranking', async ()=>{
    const rank = new mockRanginkProvider()

    const spy = jest.spyOn(rank, 'getRanking')

    await new GetRanking(rank).exec(RankingType.SEN)

    expect(spy).toHaveBeenCalled()    
  })
})