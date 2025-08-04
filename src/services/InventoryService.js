import APIClient from "../api/client";

const inventoryApi = new APIClient("/api/inventory");

export async function getItems() {
  return await inventoryApi.get("/items");
}
