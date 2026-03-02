import { api } from "./BaseUrl";



export let getDoctorSchedules = (filterBy, pageSize, pageNo, token) =>
  api.get(
    `/doctor-schedule/all-schedule?filterBy=${filterBy}&pageSize=${pageSize}&pageNo=${pageNo}`,{headers:{Authorization:`Bearer ${token}`}}
  );

export let createDoctorSchedule = (data, token) =>
  api.post("/doctor-schedule/make-schedule", data,{headers:{Authorization:`Bearer ${token}`}});
export let deleteSchedule = (id,token) =>
  api.delete(`/doctor-schedule/delete-schedule/${id}`,{headers:{Authorization:`Bearer ${token}`}});
export let updateSchedule = (id, updateDetails, token) =>
  api.put(`/doctor-schedule/update-schedule/${id}`, updateDetails,{headers:{Authorization:`Bearer ${token}`}});
