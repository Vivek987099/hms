import axios from "axios";

const doctors = axios.create({
  baseURL: "http://localhost:8080/doctor",
  withCredentials:true
});


export let getDoctors=()=> doctors.get("/all-doctors")
export let createDoctor=(formData)=>doctors.post("/create-doctor",formData)
export let getTotalNoDoctor=()=>doctors.get("/total-doctors")
export let getAllDoctors=()=>doctors.get("/all-doctors")
export let deleteDoctorById=(doctorId)=>doctors.delete(`/delete-doctor/${doctorId}`)
export let allDoctorsWithoutPagination=()=> doctors.get("/allDoctors-without-pageable")
export let updateDoctor=(id,updateDetails)=>doctors.put(`/update-doctor/${id}`,updateDetails)
export let getDoctorByDepartment=(id)=>doctors.get(`/doctor-by-department/${id}`)
