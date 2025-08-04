import { validationError } from "express-rest-error";
import idiot from "idiot";
import {
  getUserByEmail,
  create as createUser,
  saveSocialId,
  generateToken,
} from "../userService.mjs";

const xhr = idiot();
const googleURL = "https://www.googleapis.com/oauth2/v3/tokeninfo";

export default async function loginWithGoogle({ id_token }) {
  if (!id_token) throw validationError("id_token is required");
  const data = await xhr.get(googleURL, { id_token }).catch((err) => {
    throw validationError(err.error_description);
  });
  if (!data) throw new Error("No data returned from Google API");
  const { email } = data;
  if (!email) throw validationError("id_token does not have email permission");
  const existingUser = await getUserByEmail(email);
  const user =
    existingUser ||
    (await createUser(null, {
      firstName: data.given_name,
      lastName: data.family_name,
      email,
    }));
  await saveSocialId(user, { googleId: data.sub });
  return generateToken(user);
}
