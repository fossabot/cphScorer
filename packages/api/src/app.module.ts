import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import databaseConfig from "./config/database.config";
import { MatchHttpModule } from "./match/match.http.module";
import { PlayerHttpModule } from "./player/player.http.module";
import { RankingHttpModule } from "./ranking/ranking.http.module";
import { RoundHttpModule } from "./round/round.http.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    PlayerHttpModule,
    RoundHttpModule,
    MatchHttpModule,
    RankingHttpModule,
  ],
})
export class AppModule {}
