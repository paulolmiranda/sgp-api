import { MigrationInterface, QueryRunner } from 'typeorm';
import { SqlReader } from 'node-sql-reader';

export class CreateChurchSettings1744328107923 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const queries = SqlReader.readSqlFile(
      `${__dirname}/1744328107923-CreateChurchSettings-up.sql`,
    );

    for (const query of queries) {
      await queryRunner.query(query);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE churches_settings DROP CONSTRAINT churches_settings_01_fk;`,
    );
    await queryRunner.query(`DROP TABLE IF EXISTS churches_settings;`);
  }
}
