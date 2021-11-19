import { RoundProvider } from "../../providers/round.provider";
import { Round } from "@cph-scorer/model";

export class GetRound {
  constructor(private readonly roundProvider: RoundProvider) {}

  public async exec(round: number): Promise<Round> {
    return await this.roundProvider.getRound(round);
  }
}
