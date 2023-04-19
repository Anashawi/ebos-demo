import mongoose from "mongoose";
import { IFuture } from "./types";

interface ProductAttrs {
   name: string;
   futures: IFuture[]
}

interface ProductDocument extends mongoose.Document, ProductAttrs { }

interface ProductModel extends mongoose.Model<ProductDocument> {
   build(attrs: ProductAttrs): ProductDocument;
}

export interface IProduct extends ProductAttrs {
   id: string;
}

const productSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
      },
      futures: {
         type: Array<IFuture>,
         required: true,
      },
   },
   {
      toJSON: {
         transform(doc, ret) {
            ret.id = ret._id.toString();
            delete ret.password;
         },
      },
   }
);

productSchema.statics.build = (attrs: ProductAttrs) => {
   return new Product(attrs);
};

export const Product =
   mongoose.models.Product ||
   mongoose.model<ProductDocument, ProductModel>("Product", productSchema);
