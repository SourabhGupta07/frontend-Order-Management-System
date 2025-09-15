//frontend/src/api/order.js
//import API from "./auth"
/*import API from "../utils/axiosInstance";  // ✅

export const getOrders = () => API.get("/orders");
export const createOrder = (order) => API.post("/orders", order);*/


import API from '../utils/axiosInstance';

export const getOrders = (params) => API.get('/orders', { params });
export const getOrder = (id) => API.get(`/orders/${id}`);
export const createOrder = (formData) => API.post('/orders', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const updateQuantity = (id, quantity) => API.put(`/orders/${id}/quantity`, { quantity });
export const deleteOrder = (id) => API.delete(`/orders/${id}`);

