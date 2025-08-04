import APIClient from "../api/client";

const appointmentApi = new APIClient("/api/appointments");

export async function getUpcomingAppointments() {
  return await appointmentApi.get("/upcoming");
}

export async function createAppointment(input) {
  return await appointmentApi.save("/", input);
}
