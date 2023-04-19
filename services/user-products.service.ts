import objectPath from "object-path";
import { IUserProduct, UserProduct } from "../models/user-product";
import { productPagesEnum } from "../models/enums";
import { IProduct } from "../models/types";

export async function getAll(currentUserId: string) {
   try {
      const result = await UserProduct.findOne({ userId: currentUserId });
      return result.toJSON();
   } catch (error) {
      console.log(error);
   }
}

export async function getOne(id: string) {
   try {
      const result = await UserProduct.findById(id);
      return result.toJSON();
   } catch (error) {
      console.log(error);
   }
}

export async function getAllLookup() {
   try {
      const result = await UserProduct.find({}, 'fullName isActive');
      result.forEach(item => {
         item._id = item._id.toString();
      });
      return result;
   } catch (error) {
      console.log(error);
   }
}

// export async function updateOne(frontEndUserProduct: IUserProduct, path: productPagesEnum) {
//    try {
//       const backEndUserProduct = await UserProduct.findById(
//          { _id: frontEndUserProduct.id }
//       );

//       frontEndUserProduct.products.map((frontProd) => {
//          const backProd = backEndUserProduct.products.find((backP: IProduct) => backP.uuid === frontProd.uuid);
//          console.log(`backProd`, backProd);

//          if (!backProd) {
//             backEndUserProduct.products = [...backEndUserProduct.products, frontProd];
//          } else {
//             if (path === productPagesEnum.futures) {
//                backProd.name = frontProd.name;
//             }
//             backProd[path] = [...frontProd[path]];
//          }
//       });

//       // problem code start
//       let filteredBEUserProds: (IProduct | null)[] = [];

//       backEndUserProduct.products.map((backProd: IProduct) => {
//          filteredBEUserProds = frontEndUserProduct.products.map((frontP: IProduct) => {
//             if (frontP.uuid !== backProd.uuid) {
//                return null;
//             }
//             return backProd;
//          });
//       });
//       backEndUserProduct.products =
//          filteredBEUserProds.filter((backProd: IProduct | null) => backProd !== null);
//       // problem code end

//       const updateResult = await UserProduct.updateOne(
//          { _id: frontEndUserProduct.id },
//          {
//             $set: { ...backEndUserProduct },
//          }
//       );
//       const updatedUserProduct = await UserProduct.findById(frontEndUserProduct.id);
//       return updatedUserProduct.toJSON();
//    } catch (error) {
//       console.log(error);
//    }
// }

export async function updateOne(frontEndUserProduct: IUserProduct, path: productPagesEnum) {
   try {
      const updateResult = await UserProduct.updateOne(
         { _id: frontEndUserProduct.id },
         {
            $set: { ...frontEndUserProduct },
         }
      );
      const updatedUserProduct = await UserProduct.findById(frontEndUserProduct.id);
      return updatedUserProduct.toJSON();
   } catch (error) {
      console.log(error);
   }
}

export async function insertOne(userProduct: IUserProduct) {
   try {
      const frontEndUserProduct = new UserProduct(userProduct)
      await frontEndUserProduct.save();
      return frontEndUserProduct.toJSON();
   } catch (error) {
      console.log(error);
   }
}

export async function deleteOne(id: string) {
   try {
      const result = await UserProduct.findByIdAndDelete(id);
      return result.toJSON();
   } catch (error) {
      console.log(error);
   }
}