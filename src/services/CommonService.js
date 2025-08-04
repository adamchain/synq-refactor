import APIClient from "../api/client";

const commonApi = new APIClient("/api/common");

export async function getStates() {
  return await commonApi.get("/states");
}

export async function getTimezones() {
  return await commonApi.get("/timezones");
}
