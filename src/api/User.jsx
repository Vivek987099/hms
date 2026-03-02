import { api } from "./BaseUrl";

export let getTotalNoOfUser = (token) =>
  api.get("/api/user/total-users", {
    headers: { Authorization: `Bearer ${token}` },
  });
export let addNewUser = (userDetails, token) =>
  api.post("/api/user/create-user", userDetails, {
    headers: { Authorization: `Bearer ${token}` },
  });
export let verifyUserOtp = (verifyDetails, token) =>
  api.post("/api/user/verify-otp", verifyDetails, {
    headers: { Authorization: `Bearer ${token}` },
  });
export let getAllUsers = (pageSize, PageNo, token) =>
  api.get(`/api/user/all-users?pageSize=${pageSize}&pageNo=${PageNo}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export let deleteUserById = (id, token) =>
  api.delete(`/api/user/delete-user/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export let getUserByRole = (role, token) =>
  api.get(`/api/user/users/${role}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
