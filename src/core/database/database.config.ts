import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
  return {
    url:
      process.env.PG_URL ??
      `postgresql://postgres:postgres@127.0.0.1:5432/social_network`,
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
