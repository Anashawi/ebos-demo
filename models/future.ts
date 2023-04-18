import mongoose from "mongoose";

interface FutureAttrs {
   productId: string;
   year: number;
   level: number;
   sales: number;
}

interface FutureDocument extends mongoose.Document, FutureAttrs { }

interface FutureModel extends mongoose.Model<FutureDocument> {
   build(attrs: FutureAttrs): FutureDocument;
}

export interface IFuture extends FutureAttrs {
   id: string;
}

const futureSchema = new mongoose.Schema(
   {
      productId: {
         type: String,
         required: true,
      },
      year: {
         type: String,
         required: true,
      },
      level: {
         type: Number,
         required: true,
      },
      sales: {
         type: Number,
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

futureSchema.statics.build = (attrs: FutureAttrs) => {
   return new Future(attrs);
};

export const Future =
   mongoose.models.Future ||
   mongoose.model<FutureDocument, FutureModel>("Future", futureSchema);
