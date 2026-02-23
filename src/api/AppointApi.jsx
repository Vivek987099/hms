import axios from "axios";

const Appointment = axios.create({
  baseURL: "https://hms-backend-production-d710.up.railway.app",
});

export let totalAppointment = (token) =>
  Appointment.get("/total-appointment", {
    headers: { Authorization: `Bearer ${token}` },
  });
export let appointmentStatusCount = (token) =>
  Appointment.get("/status-count", {
    headers: { Authorization: `Bearer ${token}` },
  });
export let getRecentAppointments = (token) =>
  Appointment.get("/recent-appointments", {
    headers: { Authorization: `Bearer ${token}` },
  });
export let getAllAppointments = (status, pageSize, pageNo, token) =>
  Appointment.get(
    `/all-appointments?filterBy=${status}&pageSize=${pageSize}&pageNo=${pageNo}`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
export let makeAppointment = (data, token) =>
  Appointment.post(`/create-appointment`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export let updateStatus = (id, Status, token) =>
  Appointment.put(
    `/update-status/${id}`,
    { status: Status },
    { headers: { Authorization: `Bearer ${token}` } },
  );
export let getAppointmentByDoctor = (token) =>
  Appointment.get("appointment-by-doctor", {
    headers: { Authorization: `Bearer ${token}` },
  });
