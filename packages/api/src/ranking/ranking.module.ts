import { Module } from "@nestjs/common";
import { DataBaseModule } from "../config/database.module";
import { RankingService } from "./ranking.service";

@Module({
  imports: [DataBaseModule],
  providers: [RankingService],
  exports: [RankingService],
})
export class RankingModule {}
