import { PlayerDao, PlayerEntity } from '@cph-scorer/database-provider'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class PlayerService {
  public readonly dao: PlayerDao

  constructor (@InjectRepository(PlayerEntity) playerRepository: Repository<PlayerEntity>) {
    this.dao = new PlayerDao(playerRepository)
  }
}
