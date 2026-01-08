import axios from "axios";


const Appointment = axios.create({
  baseURL: "http://localhost:8080/api/appointment",
  withCredentials:true
});

export let totalAppointment=()=> Appointment.get("/total-appointment")
export let appointmentStatusCount=()=> Appointment.get("/status-count")
export let getRecentAppointments=()=>Appointment.get("/recent-appointments")
export let getAllAppointments=(status,pageSize,pageNo)=>Appointment.get(`/all-appointments?filterBy=${status}&pageSize=${pageSize}&pageNo=${pageNo}`)
export let makeAppointment=(data)=>Appointment.post(`/create-appointment`,data)
export let updateStatus=(id,Status)=>Appointment.put(`/update-status/${id}`,{status:Status})