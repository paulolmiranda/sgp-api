import { MigrationInterface, QueryRunner } from 'typeorm';
import { SqlReader } from 'node-sql-reader';

export class Init1742940142016 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const queries = SqlReader.readSqlFile(
      `${__dirname}/1742940142016-init.sql`,
    );

    for (const query of queries) {
      await queryRunner.query(query);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remover FKs da tabela storys_notes
    await queryRunner.query(
      `ALTER TABLE storys_notes DROP CONSTRAINT IF EXISTS storys_notes_02_fk`,
    );

    await queryRunner.query(
      `ALTER TABLE storys_notes DROP CONSTRAINT IF EXISTS storys_notes_01_fk`,
    );

    // Remover FKs da tabela storys_tasks
    await queryRunner.query(
      `ALTER TABLE storys_tasks DROP CONSTRAINT IF EXISTS storys_tasks_03_fk`,
    );

    await queryRunner.query(
      `ALTER TABLE storys_tasks DROP CONSTRAINT IF EXISTS storys_tasks_02_fk`,
    );

    await queryRunner.query(
      `ALTER TABLE storys_tasks DROP CONSTRAINT IF EXISTS storys_tasks_01_fk`,
    );

    // Remover FKs da tabela storys
    await queryRunner.query(
      `ALTER TABLE storys DROP CONSTRAINT IF EXISTS storys_05_fk`,
    );

    await queryRunner.query(
      `ALTER TABLE storys DROP CONSTRAINT IF EXISTS storys_04_fk`,
    );

    await queryRunner.query(
      `ALTER TABLE storys DROP CONSTRAINT IF EXISTS storys_03_fk`,
    );

    await queryRunner.query(
      `ALTER TABLE storys DROP CONSTRAINT IF EXISTS storys_02_fk`,
    );

    await queryRunner.query(
      `ALTER TABLE storys DROP CONSTRAINT IF EXISTS storys_01_fk`,
    );

    // Remover FKs da tabela features
    await queryRunner.query(
      `ALTER TABLE features DROP CONSTRAINT IF EXISTS features_04_fk`,
    );

    await queryRunner.query(
      `ALTER TABLE features DROP CONSTRAINT IF EXISTS features_03_fk`,
    );

    await queryRunner.query(
      `ALTER TABLE features DROP CONSTRAINT IF EXISTS features_02_fk`,
    );

    await queryRunner.query(
      `ALTER TABLE features DROP CONSTRAINT IF EXISTS features_01_fk`,
    );

    // Remover FKs da tabela epics
    await queryRunner.query(
      `ALTER TABLE epics DROP CONSTRAINT IF EXISTS epics_03_fk`,
    );

    await queryRunner.query(
      `ALTER TABLE epics DROP CONSTRAINT IF EXISTS epics_02_fk`,
    );

    await queryRunner.query(
      `ALTER TABLE epics DROP CONSTRAINT IF EXISTS epics_01_fk`,
    );

    // Remover FKs da tabela swimlanes
    await queryRunner.query(
      `ALTER TABLE swimlanes DROP CONSTRAINT IF EXISTS swimlanes_03_fk`,
    );

    await queryRunner.query(
      `ALTER TABLE swimlanes DROP CONSTRAINT IF EXISTS swimlanes_02_fk`,
    );

    await queryRunner.query(
      `ALTER TABLE swimlanes DROP CONSTRAINT IF EXISTS swimlanes_01_fk`,
    );

    // Remover FKs da tabela teams
    await queryRunner.query(
      `ALTER TABLE teams DROP CONSTRAINT IF EXISTS teams_04_fk`,
    );

    await queryRunner.query(
      `ALTER TABLE teams DROP CONSTRAINT IF EXISTS teams_03_fk`,
    );

    await queryRunner.query(
      `ALTER TABLE teams DROP CONSTRAINT IF EXISTS teams_02_fk`,
    );

    await queryRunner.query(
      `ALTER TABLE teams DROP CONSTRAINT IF EXISTS teams_01_fk`,
    );

    // Remover FKs da tabela projects
    await queryRunner.query(
      `ALTER TABLE projects DROP CONSTRAINT IF EXISTS projects_02_fk`,
    );

    await queryRunner.query(
      `ALTER TABLE projects DROP CONSTRAINT IF EXISTS projects_01_fk`,
    );

    // Remover as tabelas na ordem inversa da criau00e7u00e3o
    await queryRunner.query(`DROP TABLE IF EXISTS storys_notes`);
    await queryRunner.query(`DROP TABLE IF EXISTS storys_tasks`);
    await queryRunner.query(`DROP TABLE IF EXISTS storys`);
    await queryRunner.query(`DROP TABLE IF EXISTS features`);
    await queryRunner.query(`DROP TABLE IF EXISTS epics`);
    await queryRunner.query(`DROP TABLE IF EXISTS swimlanes`);
    await queryRunner.query(`DROP TABLE IF EXISTS teams`);
    await queryRunner.query(`DROP TABLE IF EXISTS projects`);
    await queryRunner.query(`DROP TABLE IF EXISTS users`);
  }
}
