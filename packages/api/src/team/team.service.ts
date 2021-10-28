import { TeamDao, TeamEntity } from "@cph-scorer/database-provider";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class TeamService {
  public readonly dao: TeamDao;

  constructor(
    @InjectRepository(TeamEntity) teamRepository: Repository<TeamEntity>
  ) {
    this.dao = new TeamDao(teamRepository);
  }
}
