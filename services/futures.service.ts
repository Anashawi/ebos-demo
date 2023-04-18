import { IFuture, Future } from "../models/future";

export async function getAll() {
   try {
      const result = await Future.find();
      return result;
   } catch (error) {
      console.log(error);
   }
}

export async function getOne(id: string) {
   try {
      const result = await Future.findById(id);
      return result.toJSON();
   } catch (error) {
      console.log(error);
   }
}

export async function getAllLookup() {
   try {
      const result = await Future.find({}, 'fullName isActive');
      result.forEach(item => {
         item._id = item._id.toString();
      });
      return result;
   } catch (error) {
      console.log(error);
   }
}

export async function updateAll(futures: IFuture[]) {
   try {
      const result = await Future.updateMany(
         {},
      );
      // const updatedFuture = await Future.findById(future.id);
      // return updatedFuture.toJSON();
   } catch (error) {
      console.log(error);
   }
}

export async function insertOne(future: IFuture) {
   try {
      const newFuture = new Future(future)
      await newFuture.save();
      return newFuture.toJSON();
   } catch (error) {
      console.log(error);
   }
}

export async function deleteOne(id: string) {
   try {
      const result = await Future.findByIdAndDelete(id);
      return result.toJSON();
   } catch (error) {
      console.log(error);
   }
}
