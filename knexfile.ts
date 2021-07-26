// Update with your config settings.

const database = {
  development: {
    client: 'pg',
    connection: {
      database: 'test_advantages',
      user: 'postgres',
      password: '123'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/database/migrations`
    },
    seeds: {
      directory: `${__dirname}/src/database/seeds`
    }
  }
};

export default database;
