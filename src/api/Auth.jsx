import axios from "axios";


 
  const authentication= axios.create({
  baseURL: "https://hms-backend-production-d710.up.railway.app/api/auth",
});
export let loginUser=(loginDetails)=>authentication.post("/login",loginDetails)
export let checkAuth=(token)=>authentication.get("/checkAuth" ,{headers:{Authorization:`Bearer ${token}`}})
export let logoutUser=()=>authentication.post("/logout")
export let getProfile=(token)=>authentication.get("/profile", {headers:{Authorization:`Bearer ${token}`}})