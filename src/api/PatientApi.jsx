import axios from "axios";

const patient = axios.create({
  baseURL: "https://hms-backend-production-d710.up.railway.app/api/patient",
  withCredentials: true,
});


// total patient
export let getTotalPatientNo = (token) => patient.get("/total-patient-no",{headers:{Authorization:`Bearer ${token}`}});


// monthwise patients
export let getMonthwisePatient = (token) => patient.get("/monthwise-patients",{headers:{Authorization:`Bearer ${token}`}});


// recent patients
export let getRecentPatients = (token) => patient.get("/recent-patients",{headers:{Authorization:`Bearer ${token}`}});


// get all patients using pagination
export let getAllPatients = (pageSize, pageNo,token) =>
  patient.get(`/all-patients?pageSize=${pageSize}&pageNo=${pageNo}`,{headers:{Authorization:`Bearer ${token}`}});


// soft delete patient
export let softDelete = (id,token) => patient.delete(`/deletePatient/${id}`,{headers:{Authorization:`Bearer ${token}`}});



// register new patient 
export let registerPatient = (details,token) =>
  patient.post(`/register-patient`, details,{headers:{Authorization:`Bearer ${token}`}});

// update patient by id 
export let updatePatient=(id,data,token)=>patient.put(`/update-patient/${id}`,data,{headers:{Authorization:`Bearer ${token}`}})

