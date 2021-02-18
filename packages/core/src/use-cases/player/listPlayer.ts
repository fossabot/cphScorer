import { PlayerProvider } from '../../providers/player.provider'
import { Player } from '@cph-scorer/model'

export class ListPlayer {
  constructor (private readonly playerProvider: PlayerProvider) {}

  public async execute (): Promise<Player[]> {
    return await this.playerProvider.list()
  }
}
