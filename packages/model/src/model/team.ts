import { Player } from "./player";
import type { uuid } from "../types";

export class Team {
  public id: uuid;

  public score: number;

  public players: Player[];

  constructor(props?: Partial<Team>) {
    if (props != null) Object.assign(this, props);
  }
}
