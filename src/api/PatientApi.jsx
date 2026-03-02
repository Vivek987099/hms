import { api } from "./BaseUrl";


// total patient
export let getTotalPatientNo = (token) => api.get("/api/patient/total-patient-no",{headers:{Authorization:`Bearer ${token}`}});


// monthwise patients
export let getMonthwisePatient = (token) => api.get("/api/patient/monthwise-patients",{headers:{Authorization:`Bearer ${token}`}});


// recent patients
export let getRecentPatients = (token) => api.get("/api/patient/recent-patients",{headers:{Authorization:`Bearer ${token}`}});


// get all patients using pagination
export let getAllPatients = (pageSize, pageNo,token) =>
  api.get(`/api/patient/all-patients?pageSize=${pageSize}&pageNo=${pageNo}`,{headers:{Authorization:`Bearer ${token}`}});


// soft delete patient
export let softDelete = (id,token) => api.delete(`/api/patient/deletePatient/${id}`,{headers:{Authorization:`Bearer ${token}`}});



// register new patient 
export let registerPatient = (details,token) =>
  api.post(`/api/patient/register-patient`, details,{headers:{Authorization:`Bearer ${token}`}});

// update patient by id 
export let updatePatient=(id,data,token)=>api.put(`/api/patient/update-patient/${id}`,data,{headers:{Authorization:`Bearer ${token}`}})

