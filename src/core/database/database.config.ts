import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
  return {
    port: 5432,
    host: 'postgres',
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'changeme',
    database: process.env.DB_DATABASE_NAME || 'social',
    synchronize: false,
    migrationsTableName: `schema_migrations`,
    type: 'postgres',
    logging: true,
    entities: [__dirname + '/../../modules/**/*.entity{.ts,.js}'],
    migrationsRun: false,
    migrations: [__dirname + '/../../../migrations/*{.ts,.js}'],
    cli: {
      // Location of migration should be inside src folder
      // to be compiled into dist/ folder.
      migrationsDir: __dirname + '/../../../migrations',
    },
  };
});
