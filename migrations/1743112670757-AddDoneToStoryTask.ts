import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDoneToStoryTask1743112670757 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE storys_tasks ADD COLUMN "done" boolean NOT NULL DEFAULT false;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE storys_tasks DROP COLUMN "done";`);
  }
}
