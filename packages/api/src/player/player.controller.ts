import { Body, Controller, Get, HttpCode, InternalServerErrorException, NotFoundException, Param, Post, Put } from '@nestjs/common'
import { AddPlayer, ListPlayer, ListRegisterPlayer, PlayerUnknowException, RegisterPlayer, UpdatePlayer } from '@cph-scorer/core'
import { RankingService } from '../ranking/ranking.service'
import { PlayerService } from './player.service'
import { PlayerDTO } from './DTO/player.dto'
import { ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { UpdateInsertPlayerDto } from './DTO/updateInsertPlayer.dto'
import { RegisterPlayerDto } from './DTO/registerPlayer.dto'

@ApiTags('Player')
@Controller('player')
export class PlayerController {
  constructor (private readonly playerService: PlayerService, private readonly rankingService: RankingService) { }

  @Get('/')
  @ApiOkResponse({ description: 'List of all player', type: [PlayerDTO] })
  async list (): Promise<PlayerDTO[]> {
    const useCase = new ListPlayer(this.playerService.dao)

    return await useCase.execute()
  }

  @Get('/register')
  @ApiOkResponse({ description: 'List of all registered player', type: PlayerDTO })
  async listRegister (): Promise<PlayerDTO[]> {
    const useCase = new ListRegisterPlayer(this.playerService.dao)

    return await useCase.execute()
  }

  @Post('/')
  @HttpCode(201)
  @ApiCreatedResponse({ description: 'Add new player', type: PlayerDTO })
  async add (@Body() player: UpdateInsertPlayerDto): Promise<PlayerDTO> {
    const useCase = new AddPlayer(this.playerService.dao)

    return await useCase.execute(player)
  }

  @Put('/:id')
  @ApiOkResponse({ description: 'Update one player', type: PlayerDTO })
  @ApiNotFoundResponse({ description: 'Players is unknow' })
  async update (@Param('id') id: string, @Body() player: UpdateInsertPlayerDto): Promise<PlayerDTO> {
    const useCase = new UpdatePlayer(this.playerService.dao)
    const res = await useCase.execute(id, player)

    if (res === null) {
      throw new NotFoundException('Invalid user')
    }
    return res
  }

  @Post('/register')
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'Player is registered' })
  @ApiNotFoundResponse({ description: 'Players is unknow' })
  async registerPlayer (@Body() data: RegisterPlayerDto): Promise<void> {
    const useCase = new RegisterPlayer(this.playerService.dao, this.rankingService.dao)

    try {
      await useCase.exec(data.id, data.type)
    } catch (e) {
      if (e instanceof PlayerUnknowException) throw new NotFoundException('Invalid user')
      throw new InternalServerErrorException(e)
    }
  }
}
