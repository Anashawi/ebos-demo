import mongoose from "mongoose";
import { ProductFuture } from "../products/future.model";

interface ProductAttrs {
   name: string;
   futures: ProductFuture[];
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
         type: Array<Object>,
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


productSchema.statics.build = (attrs: ProductAttrs) => {
   return new Product(attrs);
};

export const Product =
   mongoose.models.Product ||
   mongoose.model<ProductDocument, ProductModel>("Product", productSchema);
