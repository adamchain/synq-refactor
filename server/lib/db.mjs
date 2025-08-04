import { Sequelize, Op as ops } from "sequelize";
import config from "../../config/index.mjs";
import initModels from "../models/index.mjs";

const dbConfig = config.db;

const sequelize = new Sequelize(dbConfig.name, dbConfig.user, dbConfig.pass, {
  host: dbConfig.hosts[0],
  dialect: dbConfig.dialect,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    deletedAt: 'deleted_at',
    updatedAt: 'updated_at'
  },
  pool: {
    max: 9,
    min: 0,
    idle: 10000,
  },
});

sequelize
  .authenticate()
  .then(() =>
    console.log("Connection to db has been established successfully.")
  )
  .catch((error) => console.error("Unable to connect to the database:", error));

const db = {
  sequelize,
};

export const models = initModels(sequelize);
export const Op = ops;

export default db;
