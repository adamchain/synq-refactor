import APIClient from "../api/client";

const clientApi = new APIClient("/api/clients");

export async function getClients() {
  return await clientApi.get("/");
}

export async function authenticate(credentials) {
  return await clientApi.save("/auth", credentials);
}
