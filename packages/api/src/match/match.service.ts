import { MatchDao, MatchEntity } from '@cph-scorer/database-provider'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class MatchService {
  public readonly dao: MatchDao

  constructor (@InjectRepository(MatchEntity) matchRepository: Repository<MatchEntity>) {
    this.dao = new MatchDao(matchRepository)
  }
}
