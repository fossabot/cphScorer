import { PlayerProvider } from "../../providers/player.provider";
import { Player } from "@cph-scorer/model";

export class ListRegisterPlayer {
  constructor(private readonly listRegisterPlayer: PlayerProvider) {}

  public async execute(): Promise<Player[]> {
    return await this.listRegisterPlayer.listRegister();
  }
}
