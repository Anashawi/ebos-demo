import { IUserGoal } from '../models/user-goal';
import axios from "axios";

const api = axios.create({
   baseURL: "/api",
});


export const getAll = (ISODateString: string) => {
   const queryString = ISODateString ? `?date=${ISODateString}` : '';
   return api.get(`/user-goals${queryString}`).then((res) => res.data);
}

// export const getAllLookup = () =>
//    api.get(`/goals/lookup`).then((res) => res.data);

// export const getLookup = (courseId) =>
//   api.get(`/goals/lookup/${goalId}`).then((res) => res.data);

export const insertOne = (userGoal: IUserGoal) =>
   api.post(`/user-goals`, userGoal).then((res) => res.data);

export const updateOne = (userGoal: IUserGoal) =>
   api.put(`/user-goals`, { userGoal }).then((res) => res.data);

export const Keys = {
   All: "USER_GOALS_LIST",
   UserGoal: "USER_GOAL",
   Lookup: "USER_GOAL_LOOKUP",
   AllLookup: "ALL_USER_GOALS_LOOKUP",
};
