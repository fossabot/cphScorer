import { Round } from "@cph-scorer/model";

export interface RoundProvider {
  insert: (roundNumber: number) => Promise<Round>;
  getRound: (roundNumber: number) => Promise<Round>;
}
