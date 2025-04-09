import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

export const createSession = (payment: any) =>
  api.post(`/payments`, payment).then((res) => res.data);

export const checkStatus = (orderId: any) =>
  api.post(`/payments`, { orderId }).then((res) => res.data);
