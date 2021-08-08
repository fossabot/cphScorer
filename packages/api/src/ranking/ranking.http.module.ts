import { Module } from '@nestjs/common'
import { RankingModule } from './ranking.module'
import { RankingController } from './ranking.controller'

@Module({
  imports: [RankingModule],
  controllers: [RankingController]
})
export class RankingHttpModule { }
