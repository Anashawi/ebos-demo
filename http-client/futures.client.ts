import axios from "axios";
import { IFuture } from "../models/future";

const api = axios.create({
   baseURL: "/api",
});

export const getAll = () =>
   api.get(`/futures`).then((res) => res.data);

// export const getAllLookup = () =>
//    api.get(`/futures/lookup`).then((res) => res.data);

// export const getLookup = (courseId) =>
//   api.get(`/futures/lookup/${futureId}`).then((res) => res.data);

export const insertOne = (future: IFuture) =>
   api.post(`/futures`, future).then((res) => res.data);

export const updateOne = (future: IFuture) =>
   api.put(`/futures/${future.id}`, future).then((res) => res.data);

export const getOne = (id: string) =>
   api.get(`/futures/${id}`).then((res) => res.data);

export const Keys = {
   All: "FUTURES_LIST",
   Future: "FUTURE",
   Lookup: "FUTURE_LOOKUP",
   AllLookup: "ALL_FUTURES_LOOKUP",
};
