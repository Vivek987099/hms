import axios from "axios";

const user=   axios.create({
  baseURL: "https://hms-backend-production-d710.up.railway.app/api/user",
});



export let getTotalNoOfUser=(token)=>user.get("/total-users",{headers:{Authorization:`Bearer ${token}`}})
export let addNewUser=(userDetails,token)=>user.post("/create-user",userDetails,{headers:{Authorization:`Bearer ${token}`}}) 
export let verifyUserOtp=(verifyDetails,token)=>user.post("/verify-otp",verifyDetails,{headers:{Authorization:`Bearer ${token}`}})
export let getAllUsers=(pageSize,PageNo,token)=>user.get(`/all-users?pageSize=${pageSize}&pageNo=${PageNo}`,{headers:{Authorization:`Bearer ${token}`}})
export let deleteUserById=(id,token)=>user.delete(`/delete-user/${id}`,{headers:{Authorization:`Bearer ${token}`}})
export let getUserByRole =(role,token)=>user.get(`/users/${role}`,{headers:{Authorization:`Bearer ${token}`}})
