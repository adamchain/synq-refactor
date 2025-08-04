import { validationError } from "express-rest-error";
import idiot from "idiot";
import {
  getUserByEmail,
  create as createUser,
  saveSocialId,
  generateToken,
} from "../userService.mjs";

const fb = idiot({
  baseUrl: "https://graph.facebook.com",
});

export default async function loginWithFacebook({ access_token }) {
  if (!access_token) throw validationError("access_token is required");
  const data = await fb
    .get("/me", {
      fields: "email,first_name,last_name,picture",
      access_token,
    })
    .catch((err) => {
      throw validationError(err.message);
    });
  if (!data) throw new Error("No data returned from Facebook API");
  const { email } = data;
  if (!email)
    throw validationError("access_token does not have email permission");
  const existingUser = await getUserByEmail(email);
  const user =
    existingUser ||
    (await createUser(null, {
      firstName: data.first_name,
      lastName: data.last_name,
      email,
    }));
  await saveSocialId(user, { fbId: data.id });
  return generateToken(user);
}
