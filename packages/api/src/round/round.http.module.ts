import { Module } from "@nestjs/common";
import { MatchModule } from "../match/match.module";
import { PlayerModule } from "../player/player.module";
import { TeamModule } from "../team/team.module";
import { RoundModule } from "./round.module";
import { RoundController } from "./round.controller";

@Module({
  imports: [RoundModule, PlayerModule, TeamModule, MatchModule],
  controllers: [RoundController],
})
export class RoundHttpModule {}
