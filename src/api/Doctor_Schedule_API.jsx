import axios from "axios";

const doctor_Schedule = axios.create({
  baseURL: "http://localhost:8080/doctor-schedule",
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
