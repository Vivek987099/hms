import { api } from "./BaseUrl";

export let getDoctors = (token) =>
  api.get("/doctor/all-doctors", {
    headers: { Authorization: `Bearer ${token}` },
  });
export let createDoctor = (id, formData, token) =>
  api.post(`/doctor/create-doctor/${id}`, formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
export let getTotalNoDoctor = (token) =>
  api.get("/doctor/total-doctors", {
    headers: { Authorization: `Bearer ${token}` },
  });
export let getAllDoctors = (token) =>
  api.get("/doctor/all-doctors", {
    headers: { Authorization: `Bearer ${token}` },
  });
export let deleteDoctorById = (doctorId, token) =>
  api.delete(`/doctor/delete-doctor/${doctorId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export let allDoctorsWithoutPagination = (token) =>
  api.get("/doctor/allDoctors-without-pageable", {
    headers: { Authorization: `Bearer ${token}` },
  });
export let updateDoctor = (id, updateDetails, token) =>
  api.put(`/doctor/update-doctor/${id}`, updateDetails, {
    headers: { Authorization: `Bearer ${token}` },
  });
export let getDoctorByDepartment = (id, token) =>
  api.get(`/doctor/doctor-by-department/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export let getDoctorProfile = (token) =>
  api.get(`/doctor/doctor/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
