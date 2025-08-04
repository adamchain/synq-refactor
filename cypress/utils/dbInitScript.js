import { synchronizeDB } from "./dbOrderHelper";
import db from "../../server/lib/db.mjs";

import * as userService from "../../server/services/userService.mjs";
import * as accountService from "../../server/services/accountService.mjs";

import adminData from "../fixtures/user/special/admin.json";
import accountData from "../fixtures/account/special/data.json";

import fs from "fs";
import path from "path";

// Main operation
(async () => {
  // START:

  await synchronizeDB({});

  // Create an admin.
  const createdAdmin = await userService.create(null, adminData);

  // Create additional random users / admins.
  await userService.create(null, {
    email: "testing.admin-2@does-not-exist.com",
    password: "password",
    firstName: "Second",
    lastName: "Admin",
    phone: "1234567890",
    isAdmin: true,
  });

  await userService.create(null, {
    email: "testing.user@does-not-exist.com",
    password: "password",
    firstName: "First",
    lastName: "User",
    phone: "1234567890",
    isAdmin: false,
  });

  await userService.create(null, {
    email: "testing.user-2@does-not-exist.com",
    password: "password",
    firstName: "Second",
    lastName: "User",
    phone: "1234567890",
    isAdmin: false,
  });

  // Create an associated account for the admin.
  const createdAccount = await accountService.create(createdAdmin, accountData);

  const writeAdmin = {
    id: createdAdmin.id,
    firstName: createdAdmin.firstName,
    lastName: createdAdmin.lastName,
    email: createdAdmin.email,
    password: adminData.password,
  };

  const writeAccount = {
    id: createdAccount.id,
    name: createdAccount.name,
  };

  // Add created details to fixtures.
  fs.writeFileSync(
    path.resolve(
      __dirname,
      "../fixtures/_created/createdAdminAccount.transient.json"
    ),
    JSON.stringify(
      {
        createdAdmin: writeAdmin,
        createdAccount: writeAccount,
      },
      null,
      2
    )
  );

  // END
})().then(async () => {
  await db.sequelize.close();

  console.log("All OK.");
});
