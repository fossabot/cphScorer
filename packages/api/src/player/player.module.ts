import { Module } from "@nestjs/common";
import { DataBaseModule } from "../config/database.module";
import { PlayerService } from "./player.service";

@Module({
  imports: [DataBaseModule],
  providers: [PlayerService],
  exports: [PlayerService],
})
export class PlayerModule {}
