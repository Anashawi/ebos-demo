import { IIdea } from './../models/idea';
import axios from "axios";
import { productPagesEnum } from "../models/enums";

const api = axios.create({
   baseURL: "/api",
});


export const getAll = () =>
   api.get(`/ideas`).then((res) => res.data);

export const getAllLookup = () =>
   api.get(`/ideas/lookup`).then((res) => res.data);

// export const getLookup = (courseId) =>
//   api.get(`/ideas/lookup/${productId}`).then((res) => res.data);

export const insertOne = (idea: IIdea) =>
   api.post(`/ideas`, idea).then((res) => res.data);

export const deleteOne = (id: string) =>
   api.delete(`/ideas/${id}`).then((res) => res.data);

export const Keys = {
   All: "IDEAS_LIST",
   Idea: "IDEA",
   AllLookup: "ALL_IDEAS_LOOKUP",
};
