import mongoose from "mongoose";
import { OrganizationModel } from "./types";

interface UserOrganizationsAttrs {
    userId: string;
    organizations: OrganizationModel[];
}

export interface UserOrganizationsDocument
    extends mongoose.Document,
        UserOrganizationsAttrs {}

interface UserOrganizationsModel
    extends mongoose.Model<UserOrganizationsDocument> {
    build(attrs: UserOrganizationsAttrs): UserOrganizationsDocument;
}

export interface IUserOrganizations extends UserOrganizationsAttrs {
    id: string;
}

const UserOrganizationsSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        organizations: Array<OrganizationModel>,
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id.toString();
            },
        },
    }
);

UserOrganizationsSchema.statics.build = (attrs: UserOrganizationsAttrs) => {
    return new UserOrganizations(attrs);
};

export const UserOrganizations =
    mongoose.models.UserOrganizations ||
    mongoose.model<UserOrganizationsDocument, UserOrganizationsModel>(
        "UserOrganizations",
        UserOrganizationsSchema,
        "userOrganizations"
    );
