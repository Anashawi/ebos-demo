import mongoose, { Document, Model, Schema } from "mongoose";

interface PaymentAttrs {
  apiOperation: string;
  interaction: {
    operation: string;
    merchant: {
      name: string;
    };
  };
  order: {
    currency: string;
    amount: string;
    id: string;
    description: string;
  };
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
    apiOperation: { type: String, required: true },

    interaction: {
      operation: { type: String, required: true },
      merchant: {
        name: { type: String, required: true },
      },
    },

    order: {
      currency: { type: String, required: true },
      amount: { type: String, required: true },
      id: { type: String, required: true, unique: true },
      description: { type: String, required: true },
    },
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
