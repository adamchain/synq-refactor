import { models } from "../lib/db.mjs";

const { State, TimeZone } = models;

export async function getStates(user, id) {
  return State.findAll();
}

export async function getTimezones(user, id) {
  return TimeZone.findAll();
}
