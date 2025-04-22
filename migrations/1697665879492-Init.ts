import { MigrationInterface, QueryRunner } from 'typeorm';
import { SqlReader } from 'node-sql-reader';

export class Init1697665879492 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const queries = SqlReader.readSqlFile(
      `${__dirname}/1697665879492-Init-up.sql`,
    );

    for (const query of queries) {
      await queryRunner.query(query);
    }
  }

  public async down(): Promise<void> {}
}
