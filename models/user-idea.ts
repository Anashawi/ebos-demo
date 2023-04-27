import mongoose from "mongoose";
import { IIdea } from "./types";

interface UserIdeaAttrs {
   userId: string
   ideas: IIdea[];
}

interface UserIdeaDocument extends mongoose.Document, UserIdeaAttrs { }

interface UserIdeaModel extends mongoose.Model<UserIdeaDocument> {
   build(attrs: UserIdeaAttrs): UserIdeaDocument;
}

export interface IUserIdea extends UserIdeaAttrs {
   id: string;
}

const userIdeaSchema = new mongoose.Schema(
   {
      userId: {
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
         },
      },
   }
);

userIdeaSchema.statics.build = (attrs: UserIdeaAttrs) => {
   return new UserIdea(attrs);
};

export const UserIdea =
   mongoose.models.UserIdea ||
   mongoose.model<UserIdeaDocument, UserIdeaModel>("UserIdea", userIdeaSchema, "userIdeas");
