import { Module } from "@nestjs/common";
import { DataBaseModule } from "../config/database.module";
import { RoundService } from "./roud.service";

@Module({
  imports: [DataBaseModule],
  providers: [RoundService],
  exports: [RoundService],
})
export class RoundModule {}
