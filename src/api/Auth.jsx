import axios from "axios";
 
  const authentication= axios.create({
  baseURL: "http://localhost:8080/api/auth",
  withCredentials: true,
});

export let loginUser=(loginDetails)=>authentication.post("/login",loginDetails)
export let checkAuth=()=>authentication.get("/checkAuth")
export let logoutUser=()=>authentication.post("/logout")