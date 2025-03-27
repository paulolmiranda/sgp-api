import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const ormOptions: TypeOrmModuleOptions = {
  schema: 'public',
  type: 'postgres',
  migrationsRun: false,
  autoLoadEntities: true,
  url: process.env.DB_CONNECTION,
  subscribers: [__dirname + '/**/*.subscriber.{js,ts}'],
};

export default ormOptions;
