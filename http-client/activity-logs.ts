import axios from "axios";
import { IActivityLogs } from "../models/activity-logs";

const api = axios.create({
  baseURL: "/api",
});

export const getAll = () => api.get(`/activity-logs`).then((res) => res.data);

export const insertOne = (logs: IActivityLogs): Promise<IActivityLogs> =>
  api.post(`/activity-logs`, logs).then((res) => res.data);

export const updateOne = (logs: IActivityLogs) =>
  api.put(`/activity-logs`, logs).then((res) => res.data);

export const deleteOne = (id: any) =>
  api.delete(`/activity-logs`, { data: { id } }).then((res) => res.data);

export const getOne = (id: string) =>
  api.get(`/activity-logs/${id}`).then((res) => res.data);

export const Keys = {
  All: "LOGS_LIST",
  LOG: "LOG",
};
