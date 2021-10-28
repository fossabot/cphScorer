import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import {
  PlayerEntity,
  TeamEntity,
  MatchEntity,
  RoundEntity,
  RankingEntity,
} from "@cph-scorer/database-provider";
import { Configuration } from "./config";

const config: TypeOrmModuleOptions = {
  type: "postgres",
  url: Configuration.instanceOf().database,
  entities: [PlayerEntity, TeamEntity, MatchEntity, RoundEntity, RankingEntity],
};
export default config;
