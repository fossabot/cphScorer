import { Player, Team } from '@cph-scorer/model'

export interface TeamProvider{
  insert: (player: Player[]) => Promise<Team>
}
