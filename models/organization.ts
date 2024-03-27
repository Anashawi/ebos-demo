import { Document, Model, Schema, models, model } from "mongoose";
import { IOrganization } from "./types";

interface UserOrganizationsAttrs {
  userId: string;
  organizations: IOrganization[];
}

export interface IUserOrganizations extends UserOrganizationsAttrs {
  id: string;
}

interface UserOrganizationsDocument extends Document, UserOrganizationsAttrs {}

interface UserOrganizationsModel extends Model<UserOrganizationsDocument> {
  build(attrs: UserOrganizationsAttrs): UserOrganizationsDocument;
}

const UserOrganizationsSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    organizations: Array<IOrganization>,
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

UserOrganizationsSchema.statics.build = (attrs: UserOrganizationsAttrs) => {
  return new UserOrganizations(attrs);
};

export const UserOrganizations =
  models.UserOrganizations ||
  model<UserOrganizationsDocument, UserOrganizationsModel>(
    "UserOrganizations",
    UserOrganizationsSchema,
    "userOrganizations"
  );
