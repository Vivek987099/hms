import axios from "axios";
 
  const authentication= axios.create({
  baseURL: "https://hms-backend-production-d710.up.railway.app/api/auth",
  withCredentials: true,
});

export let loginUser=(loginDetails)=>authentication.post("/login",loginDetails)
export let checkAuth=()=>authentication.get("/checkAuth")
export let logoutUser=()=>authentication.post("/logout")
export let getProfile=()=>authentication.get("/profile")