import { AddPlayer, ListPlayer, ListRegisterPlayer, UpdatePlayer } from '@cph-scorer/core'
import { Player } from '@cph-scorer/model'
import { Body, Controller, Get, HttpCode, NotFoundException, Param, Post, Put } from '@nestjs/common'
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
}
