import { Module } from '@nestjs/common'
import { DataBaseModule } from '../config/database.module'
import { MatchService } from './match.service'

@Module({
  imports: [DataBaseModule],
  providers: [MatchService],
  exports: [MatchService]
})
export class MatchModule { }
