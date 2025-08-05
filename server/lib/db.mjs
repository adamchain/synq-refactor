import { Sequelize, Op as ops } from "sequelize";
import config from "../../config/index.mjs";
import initModels from "../models/index.mjs";

const dbConfig = config.db;

const isLocalOrTest = process.env.NODE_ENV === "local" || process.env.NODE_ENV === "test";

const sequelizeOptions = {
  dialect: dbConfig.dialect,
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
};

// Add host and SSL config only for non-local/test environments
if (!isLocalOrTest) {
  sequelizeOptions.host = dbConfig.hosts[0];
  sequelizeOptions.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  };
}

// For SQLite, use storage option; for MySQL, use traditional params
const sequelize = isLocalOrTest
  ? new Sequelize({
    ...sequelizeOptions,
    storage: dbConfig.storage,
  })
  : new Sequelize(dbConfig.name, dbConfig.user, dbConfig.pass, sequelizeOptions);

sequelize
  .authenticate()
  .then(async () => {
    console.log("Connection to db has been established successfully.");

    // For local/test environments, sync the database schema
    if (isLocalOrTest) {
      try {
        await sequelize.sync({ force: false, alter: false });
        console.log("Database schema synchronized successfully.");

        // Create test data for local/test environments
        await createTestData();
      } catch (syncError) {
        // Log sync errors but don't crash the application
        if (syncError.name === 'SequelizeDatabaseError' && syncError.original.code === 'SQLITE_ERROR') {
          console.log("Note: Some database constraints already exist (this is normal for SQLite).");
        } else {
          console.warn("Database sync warning:", syncError.message);
        }
      }
    }
  })
  .catch((error) => console.error("Unable to connect to the database:", error)); const db = {
    sequelize,
  };

export const models = initModels(sequelize);
export const Op = ops;

// Create test data for development
async function createTestData() {
  try {
    const bcrypt = await import('bcrypt');
    const { User, UserPwd } = models;

    // Check if test user already exists
    const existingUser = await User.findOne({
      where: { email: 'test@test.com' }
    });

    if (!existingUser) {
      // Create test user
      const testUser = await User.create({
        email: 'test@test.com',
        isActive: true
      });

      // Create password for test user
      const hashedPassword = await bcrypt.hash('password123', 10);
      await UserPwd.create({
        id: testUser.id,
        userId: testUser.id,
        password: hashedPassword
      });

      console.log("Test user created: test@test.com / password123");
    }
  } catch (error) {
    console.log("Note: Could not create test data:", error.message);
  }
}

export default db;
