import { MigrationInterface, QueryRunner } from 'typeorm'

export class Seed1617737108784 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    const player: number[] = new Array(16)
      .fill(0)
      .map((_, i) => i)

    for (const i of player) {
      await queryRunner.query(`insert into player values(default,'player${i}','player${i}',default)`)
    }
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
  }
}
