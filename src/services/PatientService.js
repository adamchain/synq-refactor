import APIClient from "../api/client";

const patientApi = new APIClient("/api/patients");

export async function getPatients() {
  return await patientApi.get("/");
}
