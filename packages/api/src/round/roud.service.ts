import { RoundDao, RoundEntity } from '@cph-scorer/database-provider'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class RoundService {
  public readonly dao: RoundDao

  constructor (@InjectRepository(RoundEntity) roundRepository: Repository<RoundEntity>) {
    this.dao = new RoundDao(roundRepository)
  }
}
