import config from "../../config/index.mjs";
import isValidEmail from "is-valid-email";
import {
  accessDenied,
  validationError,
  authRequired
} from "express-rest-error";
import { models, Op } from "../lib/db.mjs";

const { User } = models;

export async function find(user, query) {
  if (!user) throw authRequired();
  let hasAccess = user.roles.includes('admin');

  if (!hasAccess) throw accessDenied();

  const { limit = config.db.defaultLimit, offset = 0, ...rest } = query;
  return User.findAndCountAll({
    where: { ...rest },
    limit,
    offset,
  });
}

export async function update(user, userId, data) {
  if (!user) throw authRequired();
  if (user.id !== userId && !user.isAdmin) {
    throw accessDenied();
  }
  const row = await User.findByPk(userId);
  if (!row) {
    throw validationError(`Invalid userId '${userId}'`);
  }

  if (data.email) {
    if (!isValidEmail(data.email)) {
      throw validationError(`'${data.email}' is not a valid email address.`);
    }
    data.email = data.email.trim().toLowerCase();
  }

  Object.assign(row, data);

  await row.save();

  return get(user, userId);
}

export async function saveSocialId(user, social = {}) {
  if (!user) throw authRequired();
  user.social = { ...user.social, ...social };
  return user.save();
}

export async function get(user, userId) {
  if (user.id !== userId && !user.isAdmin) {
    throw accessDenied();
  }

  const row = await User.findByPk(userId);
  return row;
}

export async function getUserByEmail(email) {
  return User.findOne({
    where: {
      email: {
        [Op.iLike]: email.trim(),
      },
    },
  });
}
