import { Match } from '@cph-scorer/model'
import { ApiProperty } from '@nestjs/swagger'
import { TeamDTO } from '../../team/DTO/team.dto'

export class MatchDTO extends Match {
  @ApiProperty()
  public id: string

  @ApiProperty()
  public teamOne: TeamDTO

  @ApiProperty()
  public teamTwo: TeamDTO
}
