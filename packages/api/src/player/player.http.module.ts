import { Module } from '@nestjs/common'
import { PlayerController } from './player.controller'
import { PlayerModule } from './player.module'

@Module({
  imports: [PlayerModule],
  controllers: [PlayerController]
})
export class PlayerHttpModule { }
