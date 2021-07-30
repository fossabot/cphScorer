import { Round } from '@cph-scorer/model'
import { ApiProperty } from '@nestjs/swagger'
import { MatchDTO } from '../../match/DTO/match.dto'

export class RoundDTO extends Round {
  @ApiProperty()
  public id: string

  @ApiProperty({ type: [MatchDTO] })
  public matchs: MatchDTO[]

  @ApiProperty()
  public roundNumber: number
}
