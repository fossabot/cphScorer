import { RankingDao, RankingEntity } from "@cph-scorer/database-provider";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class RankingService {
  public readonly dao: RankingDao;

  constructor(
    @InjectRepository(RankingEntity)
    rankingRepository: Repository<RankingEntity>
  ) {
    this.dao = new RankingDao(rankingRepository);
  }
}
