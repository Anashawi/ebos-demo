import axios from "axios";
import { IUser } from "../models/mongoose/user";

const api = axios.create({
   baseURL: "/api",
});

export const getAll = (queryFilters: string | null) =>
   api.get(`/users`, {
      params: queryFilters,
   }).then((res) => res.data);

export const getAllLookup = () =>
   api.get(`/users/lookup`).then((res) => res.data);

// export const getLookup = (courseId) =>
//   api.get(`/users/lookup/${userId}`).then((res) => res.data);

export const insertOne = (user: IUser) =>
   api.post(`/users`, user).then((res) => res.data);

export const updateOne = (user: IUser) =>
   api.put(`/users/${user.id}`, user).then((res) => res.data);

export const getOne = (id: string) =>
   api.get(`/users/${id}`).then((res) => res.data);

export const Keys = {
   All: "OFFERS_LIST",
   User: "OFFER",
   Lookup: "OFFER_LOOKUP",
   AllLookup: "ALL_OFFERS_LOOKUP",
};
