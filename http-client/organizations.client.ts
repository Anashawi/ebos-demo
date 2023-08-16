import axios from "axios";
import { IUserOrganizations } from "../models/organization";

const api = axios.create({
   baseURL: "/api",
});

export const getAll = () => api.get(`/user-organizations`).then((res) => res.data)

export const insertOne = (userOrganizations: IUserOrganizations) => { return api.post(`/user-organizations`, userOrganizations).then((res) => res.data) }

export const updateOne = (userOrganizations: IUserOrganizations) =>
   api.put(`/user-organizations`, { userOrganizations }).then((res) => res.data);

export const keys = {
   all: "USER_ORGANIZATIONS",
   updateUserOrganizations: "UPDATE_USER_ORGANIZATIONS",
   createUserOrganizations: "CREATE_USER_ORGANIZATIONS",
};
