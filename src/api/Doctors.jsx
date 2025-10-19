import axios from "axios";

const doctors = axios.create({
  baseURL: "http://localhost:8080/doctor",
});


export let getDoctors=()=> doctors.get("/all-doctors")