import { Player, uuid } from "@cph-scorer/model";

export interface PlayerProvider {
  list: () => Promise<Player[]>;

  add: (player: Partial<Player>) => Promise<Player>;

  listRegister: () => Promise<Player[]>;

  update: (id: uuid, player: Partial<Player>) => Promise<Player>;
}
