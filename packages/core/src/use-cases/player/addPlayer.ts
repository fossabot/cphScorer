import { PlayerProvider } from '../../providers/player.provider'
import { Player } from '@cph-scorer/model'

export class AddPlayer {
  constructor (private readonly playerProvider: PlayerProvider) {}

  public async execute (player: Partial<Player>): Promise<Player> {
    return await this.playerProvider.add(player)
  }
}
