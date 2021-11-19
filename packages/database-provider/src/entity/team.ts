import { PlayerEntity } from "./player";
import { Convertor, ModelConverter, Team, uuid } from "@cph-scorer/model";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";

@Entity({ name: "team" })
@Convertor(Team, TeamEntity)
export class TeamEntity extends ModelConverter {
  @PrimaryGeneratedColumn("uuid")
  public id: uuid;

  @Column({ type: "int", default: 0 })
  public score: number;

  @ManyToMany(() => PlayerEntity, (player) => player.id, {
    onDelete: "CASCADE",
  })
  @JoinTable()
  public players: PlayerEntity[];
}
