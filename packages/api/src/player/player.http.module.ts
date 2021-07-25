import { Module } from '@nestjs/common'
import { PlayerController } from './player.controller'
import { PlayerModule } from './player.module'
import { RankingModule } from '../ranking/ranking.module'

@Module({
  imports: [PlayerModule, RankingModule],
  controllers: [PlayerController]
})
export class PlayerHttpModule { }
