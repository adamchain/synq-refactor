// NOTE: This file is a transient file for interacting with the database. Contents of this file will keep changing depending on what use case was being fulfilled at some point in time.

import db, { models } from "../../server/lib/db.mjs";
import * as userService from "../../server/services/userService.mjs";
// import * as accountService from "../../server/services/accountService";
// import * as crud from "../../server/lib/crud";
// import user from "../../server/models/User";

// Main operation
(async () => {
  // RUN:
  // const user = await models.User.findOne({
  //   where: { email: "testing.admin@does-not-exist.com" },
  // });
  // await user.update({ isAdmin: true });
  // await user.save();
  await models.Document.sync({ alter: true });
  await models.File.sync({ alter: true });
  // await models.File.update({ createdAt: new Date() }, { where: {} });
  // END
})().then(async () => {
  // await db.sequelize.close();
  console.log("Done!");
});
