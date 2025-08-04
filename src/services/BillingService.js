import APIClient from "../api/client";

const billingApi = new APIClient("/api/billing");

export async function getInvoices() {
  return await billingApi.get("/invoices");
}
