import { AddPlayer, ListPlayer, ListRegisterPlayer, UpdatePlayer } from '@cph-scorer/core'
import { Player } from '@cph-scorer/model'
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { PlayerService } from './player.service'

@Controller('player')
export class PlayerController {
  constructor (private readonly playerService: PlayerService) { }

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
  async add (@Body() player: Player): Promise<Player> {
    const useCase = new AddPlayer(this.playerService.dao)

    return await useCase.execute(player)
  }

  @Put('/:id')
  async update (@Param() id: string, @Body() player: Player): Promise<Player> {
    const useCase = new UpdatePlayer(this.playerService.dao)

    return await useCase.execute(id, player)
  }
}
