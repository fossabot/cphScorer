import { RankingType, Ranking } from "@cph-scorer/model";
import { plainToClass } from "class-transformer";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { PlayerEntity } from "./player";

@Entity({ name: "ranking" })
export class RankingEntity {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ type: "int", default: 1 })
  public participation: number;

  @Column({ type: "int", default: 0 })
  public point: number;

  @Column({ type: "int", default: 0 })
  public goalAverage: number;

  @Column({ type: "enum", enum: RankingType })
  public type: RankingType;

  @ManyToMany(() => PlayerEntity, (player) => player.id, {
    onDelete: "CASCADE",
  })
  @JoinTable()
  public players: PlayerEntity[];

  public toRanking(): Ranking {
    return plainToClass(Ranking, this);
  }

  public fromRanking(plain: Partial<Ranking>): void {
    Object.assign(this, plainToClass(RankingEntity, plain));
  }
}
