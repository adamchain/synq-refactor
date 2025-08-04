import APIClient from "../api/client";

const loginApi = new APIClient("/api");

export async function loginUser(credentials) {
  return await loginApi.save("/auth/login", credentials);
}

export async function logoutUser() {
  return await loginApi.save("/auth/logout", {});
}

export async function resetPassword(email) {
  return await loginApi.save("/auth/reset-password", { email });
}
