import Sequelize from 'sequelize'
import dotenv from 'dotenv';

dotenv.config();

// Support both individual config and single DB_URL
let db;

if (process.env.DB_URL) {
  // Use connection URL
  db = new Sequelize(process.env.DB_URL, {
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
  });
} else {
  // Use individual config
  const database = process.env.DB_NAME;
  const username = process.env.DB_USERNAME;
  const password = process.env.DB_PASSWORD;
  const host = process.env.DB_HOST;
  const port = process.env.DB_PORT;
  
  db = new Sequelize(database, username, password, {
    dialect: 'postgres',
    host: host,
    port: port,
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
  });
}

export default db;




