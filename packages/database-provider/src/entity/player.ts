import { Player } from '@cph-scorer/model'
import { plainToClass } from 'class-transformer'
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'player' })
export class PlayerEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column({ type: 'varchar', length: 30 })
  public firstName: string

  @Column({ type: 'varchar', length: 30 })
  public lastName: string

  @Column({ type: 'boolean', default: false })
  public register: boolean

  public toPlayer (): Player {
    return plainToClass(Player, this)
  }

  public fromPlayer (plain: Partial<Player>): void {
    Object.assign(this, plainToClass(PlayerEntity, plain))
  }
}
