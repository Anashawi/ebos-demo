import mongoose from "mongoose";

interface FactorAttrs {
   productId: string;
   name: string;
   competitors: {
      id: string;
      value: number;
   }[];
}

interface FactorDocument extends mongoose.Document, FactorAttrs { }

interface FactorModel extends mongoose.Model<FactorDocument> {
   build(attrs: FactorAttrs): FactorDocument;
}

export interface IFactor extends FactorAttrs {
   id: string;
}

const factorSchema = new mongoose.Schema(
   {
      productId: {
         type: String,
         required: true,
      },
      name: {
         type: String,
         required: true,
      },
      competitors: {
         type: Array<{ id: String, value: Number }>,
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

factorSchema.statics.build = (attrs: FactorAttrs) => {
   return new Factor(attrs);
};

export const Factor =
   mongoose.models.Factor ||
   mongoose.model<FactorDocument, FactorModel>("Factor", factorSchema);
