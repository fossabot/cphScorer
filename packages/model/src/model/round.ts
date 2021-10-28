import { Match } from "./match";

export class Round {
  public id: string;

  public roundNumber: number;

  public matchs: Match[];

  constructor(props?: Partial<Round>) {
    if (props != null) Object.assign(this, props);
  }
}
