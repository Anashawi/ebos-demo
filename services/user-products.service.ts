import { IUserProduct, UserProduct } from "../models/user-product";
import { productPagesEnum } from "../models/enums";
import { dbConnect } from "./db.service";

export async function getAll(currentUserId: string) {
   try {
      await dbConnect();
      const result = await UserProduct.findOne({ userId: currentUserId });
      return result?.toJSON();
   } catch (error) {
      console.log(error);
   }
}

export async function getOne(id: string) {
   try {
      await dbConnect();
      const result = await UserProduct.findById(id);
      return result?.toJSON();
   } catch (error) {
      console.log(error);
   }
}


export async function updateOne(newUserProduct: IUserProduct) {
   try {
      await dbConnect();
      await UserProduct.updateOne(
         { _id: newUserProduct.id },
         {
            $set: { ...newUserProduct },
         }
      );
      const updatedUserProduct = await UserProduct.findById(newUserProduct.id);
      return updatedUserProduct?.toJSON();
   } catch (error) {
      console.log(error);
   }
}

export async function insertOne(userProduct: IUserProduct) {
   try {
      await dbConnect();
      const { id, ...newUserProduct } = userProduct;
      const frontEndUserProduct = new UserProduct({ ...newUserProduct })
      await frontEndUserProduct.save();
      return frontEndUserProduct?.toJSON();
   } catch (error) {
      console.log(error);
   }
}

export async function deleteOne(id: string) {
   try {
      await dbConnect();
      return await UserProduct.findByIdAndDelete(id);
   } catch (error) {
      console.log(error);
   }
}
