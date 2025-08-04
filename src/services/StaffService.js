import APIClient from "../api/client";

const staffApi = new APIClient("/api/staff");

export async function getStaff() {
  return await staffApi.get("/");
}
