import { TeamEntity } from './team'
import { RoundEntity } from './round'
import { plainToClass } from 'class-transformer'
import { Match } from '@cph-scorer/model'
import { Entity, PrimaryGeneratedColumn, OneToOne, ManyToOne, JoinColumn } from 'typeorm'

@Entity()
export class MatchEntity {
  @PrimaryGeneratedColumn('rowid')
  public id: string

  @OneToOne(() => TeamEntity, { onDelete: 'CASCADE' })
  @JoinColumn()
  public teamOne: TeamEntity

  @OneToOne(() => TeamEntity, { onDelete: 'CASCADE' })
  @JoinColumn()
  public teamTwo: TeamEntity

  @ManyToOne(() => RoundEntity, { onDelete: 'CASCADE' })
  public round: RoundEntity

  public toMatch (): Match {
    return plainToClass(Match, this)
  }

  public fromMatch (plain: Partial<Match>): void {
    Object.assign(this, plainToClass(MatchEntity, plain))
  }
}
