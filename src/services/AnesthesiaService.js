import APIClient from "../api/client";

const anesthesiaApi = new APIClient("/api/anesthesia");

// Refactored to JavaScript, removed type annotations
export async function getRecords() {
  return await anesthesiaApi.get("/");
}
