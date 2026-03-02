import axios from "axios";

 export const api = axios.create({
    baseURL: "https://hms-backend-production-c52b.up.railway.app",
})
