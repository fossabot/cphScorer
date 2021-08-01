import { Match } from '@cph-scorer/model'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsUUID } from 'class-validator'
import { TeamDTO } from '../../team/DTO/team.dto'

export class MatchDTO extends Match {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID('4')
  public id: string

  @ApiProperty()
  @IsNotEmpty()
  public teamOne: TeamDTO

  @ApiProperty()
  @IsNotEmpty()
  public teamTwo: TeamDTO
}
