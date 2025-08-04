import APIClient from "../api/client";

const reportApi = new APIClient("/api/reports");

export async function getReports() {
  return await reportApi.get("/");
}
