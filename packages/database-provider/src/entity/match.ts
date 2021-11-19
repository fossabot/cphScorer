import { TeamEntity } from "./team";
import { RoundEntity } from "./round";
import { Convertor, Match, ModelConverter, uuid } from "@cph-scorer/model";
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity({ name: "match" })
@Convertor(Match, MatchEntity)
export class MatchEntity extends ModelConverter {
  @PrimaryGeneratedColumn("uuid")
  public id: uuid;

  @OneToOne(() => TeamEntity, { onDelete: "CASCADE" })
  @JoinColumn()
  public teamOne: TeamEntity;

  @OneToOne(() => TeamEntity, { onDelete: "CASCADE" })
  @JoinColumn()
  public teamTwo: TeamEntity;

  @ManyToOne(() => RoundEntity, { onDelete: "CASCADE" })
  public round: RoundEntity;
}
