import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { PlayerEntity, TeamEntity, MatchEntity, RoundEntity, RankingEntity } from '@cph-scorer/database-provider'

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL ?? 'postgres://psql:psql@127.0.0.1:5432/psql',
  entities: [PlayerEntity, TeamEntity, MatchEntity, RoundEntity, RankingEntity]
}
export default config
