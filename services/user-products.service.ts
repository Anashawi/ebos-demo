import { IUserProduct, UserProduct } from "../models/user-product";
import { productPagesEnum } from "../models/enums";

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

// export async function updateOne(frontEndUserProduct: IUserProduct, path: productPagesEnum) {
//    try {
//       const backEndUserProduct = await UserProduct.findById(
//          { _id: frontEndUserProduct.id }
//       );

//       frontEnduserProduct.products?.map((frontProd) => {
//          const backProd = backEnduserProduct.products?.find((backP: IProduct) => backP.uuid === frontProd.uuid);
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

//       backEnduserProduct.products?.map((backProd: IProduct) => {
//          filteredBEUserProds = frontEnduserProduct.products?.map((frontP: IProduct) => {
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

export async function updateOne(newUserProduct: IUserProduct, path: productPagesEnum) {
   try {
      await UserProduct.updateOne(
         { _id: newUserProduct.id },
         {
            $set: { ...newUserProduct },
         }
      );
      const updatedUserProduct = await UserProduct.findById(newUserProduct.id);
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
