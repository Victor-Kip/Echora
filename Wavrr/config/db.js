import Sequelize from 'sequelize'
import dotenv from 'dotenv';

dotenv.config();

// Support both individual config and single DB_URL
let db;

// Custom naming strategy to preserve exact column names
const namingStrategy = {
  // Use exact name without transforming
  singular: (model) => model,
  plural: (model) => model,
  // Use exact table name
  table: (model) => model,
  // Map attribute name to column name exactly
  attribute: (model, attribute) => attribute,
};

const sequelizeConfig = {
  dialect: 'postgres',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  // Fix for case-sensitive column names
  query: {
    raw: true,
  },
  // Define naming strategy to prevent automatic uppercasing
  define: {
    underscored: false,
    underscoredAll: false,
    freezeTableName: true,
    // Override the default naming strategy
  },
  // Custom schema/naming configuration
  schema: 'public',
};

if (process.env.DB_URL) {
  // Use connection URL
  db = new Sequelize(process.env.DB_URL, sequelizeConfig);
} else {
  // Use individual config
  const database = process.env.DB_NAME;
  const username = process.env.DB_USERNAME;
  const password = process.env.DB_PASSWORD;
  const host = process.env.DB_HOST;
  const port = process.env.DB_PORT;
  
  db = new Sequelize(database, username, password, {
    ...sequelizeConfig,
    host: host,
    port: port,
  });
}

export default db;




