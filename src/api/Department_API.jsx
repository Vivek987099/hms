import axios from "axios";

const department=  axios.create({
    baseURL: "http://localhost:8080/department",
    withCredentials: true,
})

export let getAllDepartments=()=>department.get("/all-departments")
export let addDepartment=(data)=> department.post("/create-department",data)
export let deleteDepartment=(id)=>department.delete(`/delete-department/${id}`)
export let updateDepartment=(id,updateDetails)=>department.put(`/update-department/${id}`,updateDetails)