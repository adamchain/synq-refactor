import APIClient from "../api/client";

const labApi = new APIClient("/api/labs");

export async function getLabResults() {
  return await labApi.get("/results");
}
