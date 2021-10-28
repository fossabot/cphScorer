import { Module } from "@nestjs/common";
import { RankingModule } from "../ranking/ranking.module";
import { TeamModule } from "../team/team.module";
import { MatchController } from "./match.controller";
import { MatchModule } from "./match.module";

@Module({
  imports: [MatchModule, TeamModule, RankingModule],
  controllers: [MatchController],
})
export class MatchHttpModule {}
