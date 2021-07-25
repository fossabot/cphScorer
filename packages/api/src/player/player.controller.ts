import { Body, Controller, Get, HttpCode, InternalServerErrorException, NotFoundException, Param, Post, Put } from '@nestjs/common'
import { AddPlayer, ListPlayer, ListRegisterPlayer, PlayerUnknowException, RegisterPlayer, UpdatePlayer } from '@cph-scorer/core'
import { Player, RankingType } from '@cph-scorer/model'
import { RankingService } from '../ranking/ranking.service'
import { PlayerService } from './player.service'

@Controller('player')
export class PlayerController {
  constructor (private readonly playerService: PlayerService, private readonly rankingService: RankingService) { }

  @Get('/')
  async list (): Promise<Player[]> {
    const useCase = new ListPlayer(this.playerService.dao)

    return await useCase.execute()
  }

  @Get('/register')
  async listRegister (): Promise<Player[]> {
    const useCase = new ListRegisterPlayer(this.playerService.dao)

    return await useCase.execute()
  }

  @Post('/')
  @HttpCode(201)
  async add (@Body() player: Player): Promise<Player> {
    const useCase = new AddPlayer(this.playerService.dao)

    return await useCase.execute(player)
  }

  @Put('/:id')
  async update (@Param('id') id: string, @Body() player: Player): Promise<Player> {
    const useCase = new UpdatePlayer(this.playerService.dao)
    const res = await useCase.execute(id, player)

    if (res === null) {
      throw new NotFoundException('Invalid user')
    }
    return res
  }

  @Post('/register')
  @HttpCode(204)
  async registerPlayer (@Body() data: { id: string, type: RankingType }): Promise<void> {
    const useCase = new RegisterPlayer(this.playerService.dao, this.rankingService.dao)

    try {
      await useCase.exec(data.id, data.type)
    } catch (e) {
      if (e instanceof PlayerUnknowException) throw new NotFoundException('Invalid user')
      throw new InternalServerErrorException(e)
    }
  }
}
