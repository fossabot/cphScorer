import { PlayerEntity } from '../src/entity/player'
import { RankingEntity } from '../src/entity/ranking'
import { TeamEntity } from '../src/entity/team'
import { RoundEntity } from '../src/entity/round'
import { MatchEntity } from '../src/entity/match'
import { Seed1617737108784 } from '../src/migration/0-Seed'
import { createConnection, getConnection } from 'typeorm'

const connection = {
  async create() {
    const con = await createConnection({
      type: 'postgres',
      url: 'postgres://psql:psql@127.0.0.1:5432/psql',
      synchronize: true,
      dropSchema: true,
      entities: [PlayerEntity, RankingEntity, TeamEntity, RoundEntity, MatchEntity],
      migrations: [Seed1617737108784]
    })
    await con.runMigrations()
  },

  async close() {
    await getConnection().close();
  },  
}

export default connection