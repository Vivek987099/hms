import { api } from "./BaseUrl";




export let getAllDepartments = (token) =>
  api.get("/department/all-departments", {
    headers: { Authorization: `Bearer ${token}` },
  });
export let addDepartment = (data, token) =>
  api.post("/department/create-department", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export let deleteDepartment = (id, token) =>
  api.delete(`/department/delete-department/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export let updateDepartment = (id, updateDetails, token) =>
  api.put(`/department/update-department/${id}`, updateDetails, {
    headers: { Authorization: `Bearer ${token}` },
  });
