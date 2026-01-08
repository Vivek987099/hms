import axios from "axios";

const user=   axios.create({
  baseURL: "http://localhost:8080/api/user",
  withCredentials: true,
});


export let getUserProfile=()=>user.get("/profile")
export let getTotalNoOfUser=()=>user.get("/total-users")
export let addNewUser=(userDetails)=>user.post("/create-user",userDetails) 
export let verifyUserOtp=(verifyDetails)=>user.post("/verify-otp",verifyDetails)
export let getAllUsers=(pageSize,PageNo)=>user.get(`/all-users?pageSize=${pageSize}&pageNo=${PageNo}`)
export let deleteUserById=(id)=>user.delete(`/delete-user/${id}`)
