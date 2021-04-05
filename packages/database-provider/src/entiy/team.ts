import { PlayerEntity } from './player'
import { Team } from '@cph-scorer/model'
import { plainToClass } from 'class-transformer'
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm'

@Entity()
export class TeamEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column({ type: 'int', default: 0 })
  public score: number

  @ManyToMany(
    () => PlayerEntity,
    player => player.id,
    { onDelete: 'CASCADE' }
  )
  @JoinTable()
  public players: PlayerEntity[]

  public toPlayer (): Team {
    return plainToClass(Team, this)
  }

  public fromPlayer (plain: Partial<Team>): void {
    Object.assign(this, plainToClass(TeamEntity, plain))
  }
}
