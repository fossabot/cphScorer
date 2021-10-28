import {
  PlayerEntity,
  RankingEntity,
  MatchEntity,
  TeamEntity,
  RoundEntity,
} from "@cph-scorer/database-provider";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PlayerEntity,
      RankingEntity,
      MatchEntity,
      TeamEntity,
      RoundEntity,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class DataBaseModule {}
