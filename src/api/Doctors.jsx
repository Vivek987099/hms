import axios from "axios";

const doctors = axios.create({
  baseURL: "https://hms-backend-production-d710.up.railway.app/doctor",
});

export let getDoctors = (token) =>
  doctors.get("/all-doctors", {
    headers: { Authorization: `Bearer ${token}` },
  });
export let createDoctor = (id, formData, token) =>
  doctors.post(`/create-doctor/${id}`, formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
export let getTotalNoDoctor = (token) =>
  doctors.get("/total-doctors", {
    headers: { Authorization: `Bearer ${token}` },
  });
export let getAllDoctors = (token) =>
  doctors.get("/all-doctors", {
    headers: { Authorization: `Bearer ${token}` },
  });
export let deleteDoctorById = (doctorId, token) =>
  doctors.delete(`/delete-doctor/${doctorId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export let allDoctorsWithoutPagination = (token) =>
  doctors.get("/allDoctors-without-pageable", {
    headers: { Authorization: `Bearer ${token}` },
  });
export let updateDoctor = (id, updateDetails, token) =>
  doctors.put(`/update-doctor/${id}`, updateDetails, {
    headers: { Authorization: `Bearer ${token}` },
  });
export let getDoctorByDepartment = (id, token) =>
  doctors.get(`/doctor-by-department/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export let getDoctorProfile = (token) =>
  doctors.get(`doctor/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
