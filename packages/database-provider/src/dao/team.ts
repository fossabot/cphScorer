import { TeamProvider } from "@cph-scorer/core";
import { Player, Team } from "@cph-scorer/model";
import { Repository } from "typeorm";
import { PlayerEntity } from "../entity/player";
import { TeamEntity } from "../entity/team";

export class TeamDao implements TeamProvider {
  constructor(private readonly teamRepository: Repository<TeamEntity>) {}

  public async insert(players: Player[]): Promise<Team> {
    const playerEntity = players.map((x) => {
      const p = new PlayerEntity();
      p.fromPlayer(x);
      return p;
    });

    const team = new TeamEntity();
    team.players = playerEntity;
    return (await this.teamRepository.save(team)).toTeam();
  }

  public async update(id: string, score: number): Promise<Team> {
    const team = await this.teamRepository.findOneOrFail({ where: { id } });
    team.score = score;
    return (await this.teamRepository.save(team)).toTeam();
  }
}
