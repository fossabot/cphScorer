import { Team } from '@cph-scorer/model'
import { ApiProperty } from '@nestjs/swagger'
import { PlayerDTO } from '../../player/DTO/player.dto'

export class TeamDTO extends Team {
  @ApiProperty()
  public id: string

  @ApiProperty()
  public score: number

  @ApiProperty({ type: [PlayerDTO] })
  public players: PlayerDTO[]
}
