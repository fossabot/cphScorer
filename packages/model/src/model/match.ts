import { Team } from "./team";
import { Round } from "./round";

export class Match {
  public id: string;

  public teamOne: Team;

  public teamTwo: Team;

  public round: Round;

  constructor(props?: Partial<Match>) {
    if (props != null) Object.assign(this, props);
  }
}
