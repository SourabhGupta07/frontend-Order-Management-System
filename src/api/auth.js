//auth.js
import API from "../utils/axiosInstance";

export const login = (credentials) => API.post("/auth/login", credentials);
export const register = (data) => API.post("/auth/register", data);
