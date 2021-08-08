import { Ranking, RankingType } from '@cph-scorer/model'
import { ApiProperty } from '@nestjs/swagger'
import { PlayerDTO } from '../../player/DTO/player.dto'

export class RankingDTO extends Ranking {
  @ApiProperty()
  public id: string

  @ApiProperty()
  public participation: number

  @ApiProperty()
  public point: number

  @ApiProperty()
  public goalAverage: number

  @ApiProperty({ enum: RankingType })
  public type: RankingType

  @ApiProperty({ type: [PlayerDTO] })
  public players: PlayerDTO[]
}
