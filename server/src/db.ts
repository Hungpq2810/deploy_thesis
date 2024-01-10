import { Sequelize } from 'sequelize';
import { createPool, Pool, PoolOptions } from 'mysql2/promise';

const dbConfig: PoolOptions = {
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '',
  database: 'activity_management',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const dbConnection: Pool = createPool(dbConfig);
export default dbConnection;

const sequelize = new Sequelize({
  dialect: 'mysql',
  dialectModule: require('mysql2'),
  host: 'localhost',
  port: 3307,
  username: 'root',
  password: 'root',
  database: 'activity_management',
  pool: {
    ...dbConfig,
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export { sequelize };
