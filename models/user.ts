import mongoose, { Document, Model, Schema } from "mongoose";
import { authProviderEnum } from "./enums";

interface UserAttrs {
  fullName: string;
  provider: authProviderEnum;
  email: string;
  phoneNumber: string;
  password: string;
  role: string;
}

export interface IUser extends UserAttrs {
  id: string;
}

interface UserDocument extends Document, UserAttrs {}

interface UserModel extends Model<UserDocument> {
  build(attrs: UserAttrs): UserDocument;
}

const userSchema = new Schema<UserDocument, UserModel>(
  {
    fullName: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id.toString();
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.statics.build = function (attrs: UserAttrs): UserDocument {
  return new User(attrs);
};

export const User = mongoose.models.User || mongoose.model<UserDocument, UserModel>("User", userSchema, "users");
