import axios from "axios";

const doctor_Schedule = axios.create({
  baseURL: "https://hms-backend-production-d710.up.railway.app/doctor-schedule",
});

export let getDoctorSchedules = (filterBy, pageSize, pageNo, token) =>
  doctor_Schedule.get(
    `/all-schedule?filterBy=${filterBy}&pageSize=${pageSize}&pageNo=${pageNo}`,{headers:{Authorization:`Bearer ${token}`}}
  );

export let createDoctorSchedule = (data, token) =>
  doctor_Schedule.post("/make-schedule", data,{headers:{Authorization:`Bearer ${token}`}});
export let deleteSchedule = (id,token) =>
  doctor_Schedule.delete(`/delete-schedule/${id}`,{headers:{Authorization:`Bearer ${token}`}});
export let updateSchedule = (id, updateDetails, token) =>
  doctor_Schedule.put(`/update-schedule/${id}`, updateDetails,{headers:{Authorization:`Bearer ${token}`}});
