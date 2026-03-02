import { api } from "./BaseUrl";



export let totalAppointment = (token) =>
  api.get("/api/appointment/total-appointment", {
    headers: { Authorization: `Bearer ${token}` },
  });
export let appointmentStatusCount = (token) =>
  api.get("/api/appointment/status-count", {
    headers: { Authorization: `Bearer ${token}` },
  });
export let getRecentAppointments = (token) =>
  api.get("/api/appointment/recent-appointments", {
    headers: { Authorization: `Bearer ${token}` },
  });
export let getAllAppointments = (status, pageSize, pageNo, token) =>
  api.get(
    `/api/appointment/all-appointments?filterBy=${status}&pageSize=${pageSize}&pageNo=${pageNo}`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
export let makeAppointment = (data, token) =>
  api.post(`/api/appointment/create-appointment`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export let updateStatus = (id, Status, token) =>
  api.put(
    `/api/appointment/update-status/${id}`,
    { status: Status },
    { headers: { Authorization: `Bearer ${token}` } },
  );
export let getAppointmentByDoctor = (token) =>
  api.get("/api/appointment/appointment-by-doctor", {
    headers: { Authorization: `Bearer ${token}` },
  });
