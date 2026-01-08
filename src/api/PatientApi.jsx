import axios from "axios";

const patient = axios.create({
  baseURL: "http://localhost:8080/api/patient",
  withCredentials: true,
});


// total patient
export let getTotalPatientNo = () => patient.get("/total-patient-no");


// monthwise patients
export let getMonthwisePatient = () => patient.get("/monthwise-patients");


// recent patients
export let getRecentPatients = () => patient.get("/recent-patients");


// get all patients using pagination
export let getAllPatients = (pageSize, pageNo) =>
  patient.get(`/all-patients?pageSize=${pageSize}&pageNo=${pageNo}`);


// soft delete patient
export let softDelete = (id) => patient.delete(`/deletePatient/${id}`);



// register new patient 
export let registerPatient = (details) =>
  patient.post(`/register-patient`, details);

// update patient by id 
export let updatePatient=(id,data)=>patient.put(`/update-patient/${id}`,data)

