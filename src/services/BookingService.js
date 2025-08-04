import APIClient from "../api/client";

const bookingApi = new APIClient("/api/v1/service");

export function getBooking(booking_id) {
  return bookingApi.get(`/booking/${booking_id}`);
}

export function createBooking(booking) {
  return bookingApi.save(`/booking`, booking);
}

export function updateBooking(booking_id, booking) {
  return bookingApi.save(`/booking/${booking_id}`, booking);
}

export function deleteBooking(booking_id) {
  return bookingApi.remove(`/booking/${booking_id}`);
}
