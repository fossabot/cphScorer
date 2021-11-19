import { PlayerProvider } from "../../providers/player.provider";
import { Player, uuid } from "@cph-scorer/model";

export class UpdatePlayer {
  constructor(private readonly playerProvider: PlayerProvider) {}

  public async execute(id: uuid, player: Partial<Player>): Promise<Player> {
    return await this.playerProvider.update(id, player);
  }
}
