// Example usage of services and utilities
import { AppointmentService, ClientService } from "@services/index";
import { formatCurrency, formatDate } from "@utils/CommonUtil";

async function example() {
  const apptRes = await AppointmentService.getUpcomingAppointments();
  if (apptRes.success) {
    apptRes.data.forEach((appt) => {
      console.log(`Appointment: ${formatDate(appt.date)} - ${appt.status}`);
    });
  }

  const clientRes = await ClientService.getClients();
  if (clientRes.success) {
    clientRes.data.forEach((client) => {
      console.log(`Client: ${client.name} - ${client.email}`);
    });
  }

  console.log(formatCurrency(123.45));
}

example();
