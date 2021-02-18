import { Player } from '@cph-scorer/model'

export interface PlayerProvider {
  list: () => Promise<Player[]>

  add: (player: Partial<Player>) => Promise<Player>

  listRegister: () => Promise<Player[]>

  update: (id: string, player: Partial<Player>) => Promise<Player>
}
