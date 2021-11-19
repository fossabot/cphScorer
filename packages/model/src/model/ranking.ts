import { Player } from "./player";
import { RankingType } from "./rankingType";
import type { uuid } from "../types";

export class Ranking {
  public id: uuid;

  public participation: number;

  public point: number;

  public goalAverage: number;

  public type: RankingType;

  public players: Player[];

  constructor(props?: Partial<Ranking>) {
    if (props != null) Object.assign(this, props);
  }
}
