import { Match, Team, Round } from "@cph-scorer/model";

export interface MatchProvider {
  insert: (teams: Team[], round: Round) => Promise<Match>;
}
