import mongoose from "mongoose";
import { IGoal } from "./types";

interface UserGoalAttrs {
   userId: string;
   goals: IGoal[];
}

interface UserGoalDocument extends mongoose.Document, UserGoalAttrs { }

interface UserGoalModel extends mongoose.Model<UserGoalDocument> {
   build(attrs: UserGoalAttrs): UserGoalDocument;
}

export interface IUserGoal extends UserGoalAttrs {
   id: string;
}

const userGoalSchema = new mongoose.Schema(
   {
      userId: {
         type: String,
         required: true,
      },
      goals: {
         type: Array<IGoal>,
         required: true,
      },
   },
   {
      toJSON: {
         transform(doc, ret) {
            ret.id = ret._id.toString();
         },
      },
   }
);

userGoalSchema.statics.build = (attrs: UserGoalAttrs) => {
   return new UserGoal(attrs);
};

export const UserGoal =
   mongoose.models.UserGoal ||
   mongoose.model<UserGoalDocument, UserGoalModel>("UserGoal", userGoalSchema);
