import APIClient from "../api/client";

const medicationApi = new APIClient("/api/medications");

export async function getMedications() {
  return await medicationApi.get("/");
}
