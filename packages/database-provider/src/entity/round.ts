import { Convertor, ModelConverter, Round, uuid } from "@cph-scorer/model";
import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from "typeorm";
import { MatchEntity } from "./match";

@Entity({ name: "round" })
@Convertor(Round, RoundEntity)
export class RoundEntity extends ModelConverter {
  @PrimaryGeneratedColumn("uuid")
  public id: uuid;

  @Column({ type: "int" })
  public roundNumber: number;

  @OneToMany(() => MatchEntity, (m) => m.round, { onDelete: "CASCADE" })
  public matchs: MatchEntity[];
}
