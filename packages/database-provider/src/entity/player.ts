import { Convertor, ModelConverter, Player, uuid } from "@cph-scorer/model";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "player" })
@Convertor(Player, PlayerEntity)
export class PlayerEntity extends ModelConverter {
  @PrimaryGeneratedColumn("uuid")
  public id: uuid;

  @Column({ type: "varchar", length: 30 })
  public firstName: string;

  @Column({ type: "varchar", length: 30 })
  public lastName: string;

  @Column({ type: "boolean", default: false })
  public register: boolean;
}
