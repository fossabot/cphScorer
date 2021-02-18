import { Player } from './player'

export class Team {
  public id: string

  public score: number

  public players: Player[]

  constructor (props?: Partial<Team>) {
    if (props != null) Object.assign(this, props)
  }
}
