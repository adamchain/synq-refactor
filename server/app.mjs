import express from "express";
import cors from "cors";
import "express-async-errors";
import { errorHandler } from "express-rest-error";
import routes from "./routes/index.mjs";
import auth from "./routes/auth.mjs";
import parseBearerToken from "parse-bearer-token";
import cookieParser from "cookie-parser";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

import { getUserByToken } from './services/index.mjs';
// import forgotPW from "express-user-auth";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

app.use("/v1", auth);

// verify token and set req.user
app.use(async (req, res, next) => {
  if (req.method === "OPTIONS") return next();
  const token = req.cookies.auth || parseBearerToken.default(req);
  if (token) {
    const [user] = await Promise.all([
      getUserByToken(token),
      // getBranchByToken(token)
    ]);
    //user.currentBranch = branchId;
    req.user = user;
  }
  return next();
});

// api routes
app.use("/v1", routes);

// TODO: implement forgot password without using express-user-auth
// // forgot password
// app.use(
//   "/",
//   forgotPW({
//     sessionSecret: "n/a",
//     getUserByUsername: getUserByEmail,
//     updateUser: (data) => updateUser({ id: data.id }, data.id, data),
//     sendPasswordReset,
//   })
// );

app.get("/logout", (req, res) => {
  res.clearCookie("auth");
  res.redirect("/");
});

// serve react app
app.use(express.static(path.join(__dirname, "..", "dist")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

// error handler is last
app.use(
  errorHandler({
    debug: true,
    transform: ({ err, req, res, responseBody }) => {
      if (err.name.includes("Sequelize")) {
        err.httpStatus = 400;
        let message = err?.original?.message;
        if (err.errors) {
          message = err.errors[0].message;
          if (message === "email must be unique") {
            message = "This email address is already in use.";
          }
        }
        responseBody.message = message;
      }
      return responseBody;
    },
  })
);

export default app;
