import { models } from "../lib/db.mjs";

import {
  createRow,
  deleteRow,
  findRows,
  getRowById,
  updateRow,
} from "../lib/crud.mjs";

const { Report: Model } = models;

export async function get(user, id) {
  return getRowById(Model, user, id);
}

export async function find(user, query, options = {}) {
  return findRows(Model, user, query, options);
}

export async function create(user, data) {
  return createRow(Model, user, data);
}

export async function update(user, id, data) {
  return updateRow(Model, user, id, data);
}

export async function del(user, id) {
  return deleteRow(Model, user, id);
}