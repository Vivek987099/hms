import axios from "axios";


const Appointment = axios.create({
  baseURL: "https://hms-backend-production-d710.up.railway.app",
  withCredentials:true
});

export let totalAppointment=()=> Appointment.get("/total-appointment")
export let appointmentStatusCount=()=> Appointment.get("/status-count")
export let getRecentAppointments=()=>Appointment.get("/recent-appointments")
export let getAllAppointments=(status,pageSize,pageNo)=>Appointment.get(`/all-appointments?filterBy=${status}&pageSize=${pageSize}&pageNo=${pageNo}`)
export let makeAppointment=(data)=>Appointment.post(`/create-appointment`,data)
export let updateStatus=(id,Status)=>Appointment.put(`/update-status/${id}`,{status:Status})
export let getAppointmentByDoctor=()=>Appointment.get("appointment-by-doctor")