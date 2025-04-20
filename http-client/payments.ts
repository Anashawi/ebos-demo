import axios from "axios";

import { IPayment } from "../models/payments";

const api = axios.create({
  baseURL: "/api",
});

export const getAll = () => api.get(`/payments`).then((res) => res.data);

export const createSession = (payment: any) =>
  api.post(`/payments`, payment).then((res) => res.data);

export const insertOne = (payment: IPayment) =>
  api.post(`/payments`, payment).then((res) => res.data);

export const deleteOne = (id: any) =>
  api.delete(`/payments`, { data: { id } }).then((res) => res.data);
