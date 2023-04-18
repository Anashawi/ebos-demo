import { IProduct, Product } from "../models/product";

export async function getAll(currentUserId: string) {
   try {
      const result = await Product.find({ userId: currentUserId });
      return result;
   } catch (error) {
      console.log(error);
   }
}

export async function getOne(id: string) {
   try {
      const result = await Product.findById(id);
      return result.toJSON();
   } catch (error) {
      console.log(error);
   }
}

export async function getAllLookup() {
   try {
      const result = await Product.find({}, 'fullName isActive');
      result.forEach(item => {
         item._id = item._id.toString();
      });
      return result;
   } catch (error) {
      console.log(error);
   }
}

export async function updateAll(products: IProduct[]) {
   try {
      const result = await Product.updateMany(
         {},
      );
      // const updatedProduct = await Product.findById(product.id);
      // return updatedProduct.toJSON();
   } catch (error) {
      console.log(error);
   }
}

export async function insertOne(product: IProduct) {
   try {
      const newProduct = new Product(product)
      await newProduct.save();
      return newProduct.toJSON();
   } catch (error) {
      console.log(error);
   }
}

export async function deleteOne(id: string) {
   try {
      const result = await Product.findByIdAndDelete(id);
      return result.toJSON();
   } catch (error) {
      console.log(error);
   }
}
