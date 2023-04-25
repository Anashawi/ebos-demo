import { IIdea } from './../models/types';
import axios from "axios";
import { productPagesEnum } from "../models/enums";

const api = axios.create({
   baseURL: "/api",
});


export const getAll = () =>
   api.get(`/user-ideas`).then((res) => res.data);

export const getAllLookup = () =>
   api.get(`/user-ideas/lookup`).then((res) => res.data);

// export const getLookup = (courseId) =>
//   api.get(`/user-ideas/lookup/${productId}`).then((res) => res.data);

export const insertOne = (idea: IIdea) =>
   api.post(`/user-ideas`, idea).then((res) => res.data);

export const deleteOne = (uuid: string) =>
   api.delete(`/user-ideas/${uuid}`).then((res) => res.data);

export const Keys = {
   All: "USER_IDEAS_LIST",
   AllLookup: "ALL_USER_IDEAS_LOOKUP",
};
