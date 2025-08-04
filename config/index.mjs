import dotEnv from "dotenv";
import frontendConfig from "./frontendConfig.mjs";

const isLocalTestEnv =
  process.env.NODE_ENV === "local" || process.env.NODE_ENV === "test";
const envPath = isLocalTestEnv ? `.env.${process.env.NODE_ENV}` : ".env";
dotEnv.config({ path: envPath });
let config = {};

let dbHost = process.env.DB_HOST;
let dbUser = process.env.DB_USER;
let dbPass = process.env.DB_PASSWORD;
let dbName = process.env.DB_NAME;

if (process.env.DATABASE_URL) {
  const dbUrl = new URL(process.env.DATABASE_URL);
  dbHost = dbUrl.host;
  dbUser = dbUrl.username;
  dbPass = dbUrl.password;
  dbName = dbUrl.pathname.slice(1);
}

config.default = {
  db: {
    // debug: console.log,
    dialect: "mysql",
    hosts: [dbHost],
    user: dbUser,
    pass: dbPass,
    name: dbName,
    memoize: 150,
    defaultLimit: 100,
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    bucket: "beclosed",
  },
  smtp: {
    host: "smtp.mailgun.org",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAILGUN_USER,
      pass: process.env.MAILGUN_PASS,
    },
  },
  twilio: {
    accountSID: process.env.TWILIO_SID,
    authToken: process.env.TWILIO_TOKEN,
    fromPhoneNumber: "+18565224083",
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    ttl: 60 * 60 * 24 * 7, // 7 days
  },
  google: {
    apiKey: process.env.GOOGLE_API_KEY,
  },
};

config = { ...config.default, ...frontendConfig };

if (config[process.env.NODE_ENV]) {
  config = { ...config, ...config[process.env.NODE_ENV] };
}

export default config;
