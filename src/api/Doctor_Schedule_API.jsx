import axios from "axios";

const doctor_Schedule = axios.create({
  baseURL: "https://hms-backend-production-d710.up.railway.app",
  withCredentials: true,
});

export let getDoctorSchedules = (filterBy, pageSize, pageNo) =>
  doctor_Schedule.get(
    `/all-schedule?filterBy=${filterBy}&pageSize=${pageSize}&pageNo=${pageNo}`
  );

export let createDoctorSchedule = (data) =>
  doctor_Schedule.post("/make-schedule", data);
export let deleteSchedule = (id) =>
  doctor_Schedule.delete(`/delete-schedule/${id}`);
export let updateSchedule = (id, updateDetails) =>
  doctor_Schedule.put(`/update-schedule/${id}`, updateDetails);
