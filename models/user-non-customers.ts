import mongoose from "mongoose";

interface UserNonCustomersAttrs {
   userId: string;
   soonNonCustomers: string[],
   refusingCustomers: string[],
   unwantedCustomers: string[],
}

interface UserNonCustomersDocument extends mongoose.Document, UserNonCustomersAttrs { }

interface UserNonCustomersModel extends mongoose.Model<UserNonCustomersDocument> {
   build(attrs: UserNonCustomersAttrs): UserNonCustomersDocument;
}

export interface IUserNonCustomers extends UserNonCustomersAttrs {
   id: string;
}

const userNonCustomersSchema = new mongoose.Schema(
   {
      userId: {
         type: String,
         required: true,
      },
      soonNonCustomers: {
         type: Array<String>,
         required: true
      },
      refusingCustomers: {
         type: Array<String>,
         required: true
      },
      unwantedCustomers: {
         type: Array<String>,
         required: true
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

userNonCustomersSchema.statics.build = (attrs: UserNonCustomersAttrs) => {
   return new UserNonCustomers(attrs);
};

export const UserNonCustomers =
   mongoose.models.UserNonCustomers ||
   mongoose.model<UserNonCustomersDocument, UserNonCustomersModel>("UserNonCustomers", userNonCustomersSchema);
