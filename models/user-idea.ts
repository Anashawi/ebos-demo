import { Document, Model, Schema, models, model } from "mongoose";
import { IIdea } from "./types";

interface UserIdeasAttrs {
  userId: string;
  startDate?: string;
  ideas: IIdea[];
}

export interface IUserIdeas extends UserIdeasAttrs {
  id: string;
}

interface UserIdeasDocument extends Document, UserIdeasAttrs {}

interface UserIdeasModel extends Model<UserIdeasDocument> {
  build(attrs: UserIdeasAttrs): UserIdeasDocument;
}

const userIdeasSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: false,
    },
    ideas: {
      type: Array<IIdea>,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id.toString();
        delete ret.__v;
      },
    },
  }
);

userIdeasSchema.statics.build = (attrs: UserIdeasAttrs) => {
  return new UserIdeas(attrs);
};

export const UserIdeas =
  models.UserIdeas || model<UserIdeasDocument, UserIdeasModel>("UserIdeas", userIdeasSchema, "userIdeas");
