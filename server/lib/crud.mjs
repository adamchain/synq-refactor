import config from "../../config/index.mjs";
import { authRequired, validationError } from "express-rest-error";
import { v4 } from "uuid";
import { Op } from "sequelize";

/**
 * Get row by id
 * @param model
 * @param user
 * @param id
 * @param options
 * @returns {Promise<*>}
 */
export async function getRowById(
  model,
  user,
  id,
  options = { authBypass: false, include: [] }
) {
  const { authBypass, include = [], order } = options;

  if (!user && !authBypass) throw authRequired();

  // const as = model.name !== "account" ? `${model.name}Owner` : "users";
  // include.push({ model: models.User, as });

  const opts = {
    paranoid: false,
    include,
    order,
  };

  let row;
  if (Object(id) === id) row = model.findOne({ where: id }, opts);
  else row = model.findByPk(id, opts);

  if (!row) {
    throw validationError(`Invalid ${model} id: '${id}'`);
  }

  return row;
}

/**
 * Find rows
 * @param model
 * @param user
 * @param query
 * @param options
 * @returns {Promise<*>}
 */
export async function findRows(
  model,
  user,
  query,
  options = { authBypass: false, paranoid: true, include: [] }
) {
  const { authBypass, include = [], order } = options;

  if (!user && !authBypass) throw authRequired();

  // include.push({ model: models.users, as: 'createdByUser' });

  const {
    limit = config.db.defaultLimit,
    showDeleted = "true",
    showDeletedOnly = "false",
    offset = 0,
    ...where
  } = query;

  if (
    typeof model.rawAttributes.accountId !== "undefined" &&
    !options.authBypass
  ) {
    where.accountId = user.currentAccountId;
  }

  if (showDeletedOnly !== "false") {
    where.deletedAt = {
      [Op.ne]: null,
    };
  }

  return model.findAndCountAll({
    where,
    limit,
    offset,
    paranoid: showDeleted === "true" && showDeletedOnly === "false",
    include,
    order,
  });
}

/**
 * Find super user rows
 * @param model
 * @param user
 * @param query
 * @param options
 * @returns {Promise<*>}
 */
export async function findAllRows(
  model,
  user,
  query,
  options = { authBypass: false, paranoid: true, include: [] }
) {
  const { authBypass, include = [], order } = options;

  if (!user && !authBypass) throw authRequired();

  // include.push({ model: models.users, as: 'createdByUser' });

  const {
    limit = config.db.defaultLimit,
    showDeleted = "true",
    showDeletedOnly = "false",
    offset = 0,
    ...where
  } = query;

  if (showDeletedOnly !== "false") {
    where.deletedAt = {
      [Op.ne]: null,
    };
  }

  return model.findAndCountAll({
    where,
    limit,
    offset,
    paranoid: showDeleted === "true" && showDeletedOnly === "false",
    include,
    order,
  });
}

/**
 * Create row
 * @param model
 * @param user
 * @param data
 * @param options
 * @returns {Promise<*>}
 */
export async function createRow(
  model,
  user,
  data,
  options = { authBypass: false }
) {
  if (!user && !options.authBypass) throw authRequired();
  const id = v4();
  return model.create({
    id,
    ...data,
    accountId: user.currentAccountId,
    createdBy: user.id,
    updatedBy: user.id,
  });
}

/**
 * Update Row
 * @param model
 * @param user
 * @param id
 * @param data
 * @param options
 * @returns {Promise<*>}
 */
export async function updateRow(
  model,
  user,
  id,
  data,
  options = { authBypass: false }
) {
  if (!user && !options.authBypass) throw authRequired();

  const row = await getRowById(model, user, id, options);

  if (data.deletedAt === null && row.deletedAt !== null) {
    row.setDataValue("deletedAt", null);
    delete data.deletedAt;
  }

  if (!options.authBypass) data.updatedBy = user.id;

  Object.assign(row, data);

  row.accountId = user.currentAccountId;
  return row.save();
}

/**
 * soft delete row.
 * @param model
 * @param user
 * @param id
 * @param options
 * @returns {Promise<*>}
 */
export async function deleteRow(
  model,
  user,
  id,
  options = { authBypass: false }
) {
  if (!user && !options.authBypass) throw authRequired();

  const row = await getRowById(model, user, id, options);
  if (!row)
    throw validationError("The user is not associated with this account");

  return row.destroy();
}
