import { api } from "./BaseUrl";

export let loginUser=(loginDetails)=>api.post("/api/auth/login",loginDetails)
export let checkAuth=(token)=>api.get("/api/auth/checkAuth" ,{headers:{Authorization:`Bearer ${token}`}})
export let logoutUser=()=>api.post("/api/auth/logout")
export let getProfile=(token)=>api.get("/api/auth/profile", {headers:{Authorization:`Bearer ${token}`}})