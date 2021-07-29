import { ConflictException, Controller, HttpCode, InternalServerErrorException, Param, Post } from '@nestjs/common'
import { PlayerService } from '../player/player.service'
import { GenerateRound, MaxCallError } from '@cph-scorer/core'
import { RoundService } from './roud.service'
import { TeamService } from '../team/team.service'
import { MatchService } from '../match/match.service'
import { ApiConflictResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger'

@Controller('round')
@ApiTags('Tournament')
export class RoundController {
  constructor (private readonly playerService: PlayerService, private readonly roundService: RoundService, private readonly teamService: TeamService, private readonly matchService: MatchService) { }

  @Post('/generate/:number')
  @HttpCode(201)
  @ApiCreatedResponse({ description: 'Rounds was generated' })
  @ApiConflictResponse({ description: 'The generation is mathematicaly imposible' })
  async generate (@Param('number') numberOfRound: number): Promise<void> {
    const useCase = new GenerateRound(this.playerService.dao, this.roundService.dao, this.teamService.dao, this.matchService.dao)

    try {
      await useCase.exec(numberOfRound)
    } catch (e) {
      if (e instanceof MaxCallError) throw new ConflictException(e.message)
      throw new InternalServerErrorException(e)
    }
  }
}
