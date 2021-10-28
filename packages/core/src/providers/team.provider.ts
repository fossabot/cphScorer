import { Player, Team } from "@cph-scorer/model";

export interface TeamProvider {
  insert: (players: Player[]) => Promise<Team>;
  update: (id: string, score: number) => Promise<Team>;
}
