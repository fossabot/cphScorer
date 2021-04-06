import { plainToClass } from 'class-transformer'
import { Round } from '@cph-scorer/model'
import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from 'typeorm'
import { MatchEntity } from './match'

@Entity({ name: 'round' })
export class RoundEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column({ type: 'int' })
  public roundNumber: number

  @OneToMany(
    () => MatchEntity,
    m => m.round,
    { onDelete: 'CASCADE' }
  )
  public matchs: MatchEntity[]

  public toRound (): Round {
    return plainToClass(Round, this)
  }

  public fromRound (plain: Partial<Round>): void {
    Object.assign(this, plainToClass(RoundEntity, plain))
  }
}
