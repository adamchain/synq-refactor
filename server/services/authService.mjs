import { models, Op } from '../lib/db.mjs'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { authRequired, validationError } from 'express-rest-error'
import moment from 'moment'
import config from '../../config/index.mjs'

const SALT_ROUNDS = 10

const { User, UserPwd } = models;

export async function authenticate({ username, password }) {
  if (!username) {
    throw validationError("Missing username.");
  }
  if (!password) {
    throw validationError("Missing password.");
  }
  const user = await User.findOne({
    where: {
      isActive: true,
      email: {
        [Op.iLike]: username.trim(),
      },
    },
  });

  if (!user) {
    throw validationError("Email not found.");
  }

  const latestPwd = await UserPwd.findOne({
    rejectOnEmpty: undefined,
    where: { userId: user.id },
    order: [['created_time', 'DESC']]
  })

  if (!latestPwd) throw new Error('Password not set for user');

  const isMatch = await bcrypt.compare(password, latestPwd.password)
  if (!isMatch) throw validationError("Wrong password.");

  return generateToken(user);
}
export async function logout(user, id) {
  // todo: implement logout
}

export const register = async ({ email, password }) => {
  const existing = await User.findOne({ rejectOnEmpty: undefined, where: { email } })
  if (existing) throw new Error('Email already in use')

  const user = await User.create({ email })

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

  await UserPwd.create({ user_id: user.id, password: hashedPassword })

  return user
}

export async function sendPasswordReset(user, id) {
  // todo: implement send password reset
}

export async function resetPassword(email) {
  // todo: implement reset password
}

function verifyToken(token) {
  let decoded;
  try {
    decoded = jwt.verify(token, config.jwt.secret);
  } catch (error) {
    throw authRequired("Access token is not valid.");
  }

  if (!decoded.u || decoded.a === undefined) {
    throw authRequired("Access token is not valid.");
  }

  return decoded;
}

export async function getUserByToken(token) {
  const decodedToken = verifyToken(token);
  const userId = decodedToken.u;
  const row = await User.findByPk(userId, { raw: true });
  return row;
}

export async function generateToken(user) {
  const expiresInDays = 365;
  const expirationTimestamp = moment().add(expiresInDays, "days").format("X");
  const payload = {
    u: user.id,
    exp: parseInt(expirationTimestamp, 10),
  };
  return {
    accessToken: jwt.sign(payload, config.jwt.secret),
    expires: new Date(expirationTimestamp * 1000),
    user,
  };
}