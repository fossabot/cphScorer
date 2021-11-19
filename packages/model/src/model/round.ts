import { Match } from "./match";
import type { uuid } from "../types";

export class Round {
  public id: uuid;

  public roundNumber: number;

  public matchs: Match[];

  constructor(props?: Partial<Round>) {
    if (props != null) Object.assign(this, props);
  }
}
