import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOrderToSwimlane1743112334863 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE swimlanes ADD COLUMN "order" int NOT NULL DEFAULT 0;
`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE swimlanes DROP COLUMN "order";`);
  }
}
