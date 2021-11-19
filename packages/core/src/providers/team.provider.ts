import { Player, Team, uuid } from "@cph-scorer/model";

export interface TeamProvider {
  insert: (players: Player[]) => Promise<Team>;
  update: (id: uuid, score: number) => Promise<Team>;
}
