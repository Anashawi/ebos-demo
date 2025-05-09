import { IUserGoals } from '../models/user-goal';
import axios from "axios";

const api = axios.create({
   baseURL: "/api",
});

export const getAll = () => {
   return api.get(`/user-goals`).then((res) => res.data);
}

export const insertOne = (userGoals: IUserGoals) => { return api.post(`/user-goals`, userGoals).then((res) => res.data) }

export const updateOne = (userGoals: IUserGoals) =>
   api.put(`/user-goals`, { userGoals }).then((res) => res.data);

export const Keys = {
   All: "USER_GOALS_LIST",
   UserGoals: "USER_GOAL",
};
