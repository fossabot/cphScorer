import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import databaseConfig from './config/database.config'
import { PlayerHttpModule } from './player/player.http.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    PlayerHttpModule
  ]
})
export class AppModule {}
