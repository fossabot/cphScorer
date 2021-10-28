import { Player } from "@cph-scorer/model";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsUUID } from "class-validator";

export class PlayerDTO extends Player {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID("4")
  public id: string;

  @ApiProperty()
  @IsNotEmpty()
  public firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  public lastName: string;

  @ApiProperty()
  @IsBoolean()
  public register: boolean;
}
