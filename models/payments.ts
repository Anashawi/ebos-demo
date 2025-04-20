import mongoose, { Document, Model, Schema } from "mongoose";

interface PaymentAttrs {
  userName: string;
  userId: string;
  userEmail: string;
  orderId: string;
  subscriptionDate: Date;
  subscriptionExpirationDate: Date;
}

export interface IPayment extends PaymentAttrs {
  id: string;
  createdAt: string;
  updatedAt: string;
}

interface PaymentDocument extends Document, PaymentAttrs {}

interface PaymentModel extends Model<PaymentDocument> {
  build(attrs: PaymentAttrs): PaymentDocument;
}

const PaymentSchema = new Schema<PaymentDocument, PaymentModel>(
  {
    userName: { type: String, required: true },
    userId: { type: String, required: true },
    userEmail: { type: String, required: true },
    orderId: { type: String, required: true, unique: true },
    subscriptionDate: { type: Date, required: true },
    subscriptionExpirationDate: { type: Date, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id.toString();
        delete ret.__v;
      },
    },
  }
);

PaymentSchema.statics.build = function (attrs: PaymentAttrs): PaymentDocument {
  return new Payment(attrs);
};

export const Payment =
  mongoose.models.Payment ||
  mongoose.model<PaymentDocument, PaymentModel>("Payment", PaymentSchema);
