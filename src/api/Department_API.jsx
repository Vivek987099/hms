import axios from "axios";

const department = axios.create({
  baseURL: "https://hms-backend-production-d710.up.railway.app/department",
});

export let getAllDepartments = (token) =>
  department.get("/all-departments", {
    headers: { Authorization: `Bearer ${token}` },
  });
export let addDepartment = (data, token) =>
  department.post("/create-department", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export let deleteDepartment = (id, token) =>
  department.delete(`/delete-department/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export let updateDepartment = (id, updateDetails, token) =>
  department.put(`/update-department/${id}`, updateDetails, {
    headers: { Authorization: `Bearer ${token}` },
  });
