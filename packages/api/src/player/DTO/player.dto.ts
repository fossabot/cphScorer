import { Player } from '@cph-scorer/model'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class PlayerDTO extends Player {
  @ApiProperty()
  public id: string

  @ApiProperty()
  @IsNotEmpty()
  public firstName: string

  @ApiProperty()
  @IsNotEmpty()
  public lastName: string

  @ApiProperty()
  public register: boolean
}
