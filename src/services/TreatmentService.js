import APIClient from "../api/client";

const treatmentApi = new APIClient("/api/treatments");

export async function getTreatments() {
  return await treatmentApi.get("/");
}
