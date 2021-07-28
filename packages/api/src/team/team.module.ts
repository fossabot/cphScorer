import { Module } from '@nestjs/common'
import { DataBaseModule } from '../config/database.module'
import { TeamService } from './team.service'

@Module({
  imports: [DataBaseModule],
  providers: [TeamService],
  exports: [TeamService]
})
export class TeamModule { }
