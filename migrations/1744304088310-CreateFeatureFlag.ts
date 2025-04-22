import { MigrationInterface, QueryRunner } from 'typeorm';
import { SqlReader } from 'node-sql-reader';

export class CreateFeatureFlag1744304088310 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const queries = SqlReader.readSqlFile(
      `${__dirname}/1744304088310-CreateFeatureFlag-up.sql`,
    );

    for (const query of queries) {
      await queryRunner.query(query);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS features_flags;`);
  }
}
