import { DataSource } from 'typeorm';
import { resolve, join } from 'path';
import 'dotenv/config';

export default new DataSource({
  schema: 'public',
  type: 'postgres',
  migrationsRun: false,
  url: process.env.DB_MIGRATION_CONNECTION,
  migrations: [join(resolve('./'), '/migrations/**/*.{ts,js}')],
});
