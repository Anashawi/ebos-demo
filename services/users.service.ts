import { IUser, User } from "../models/user";

export async function getAll(query: { searchText?: any; }) {
   try {
      let result;
      if (!!Object.keys(query).length) {
         result = await User.find({ fullName: { $regex: query.searchText } });
      } else {
         result = await User.find();
      }
      return result;
   } catch (error) {
      console.log(error);
   }
}

export async function getOne(id: string) {
   try {
      const result = await User.findById(id);
      return result.toJSON();
   } catch (error) {
      console.log(error);
   }
}

export async function getAllLookup() {
   try {

      const result = await User.find({}, 'fullName isActive');
      result.forEach(item => {
         item._id = item._id.toString();
      });
      return result;
   } catch (error) {
      console.log(error);
   }
}

export async function updateOne(user: IUser) {
   try {

      const result = await User.updateOne(
         { _id: user.id },
         { $set: { ...user } }
      );
      const updatedUser = await User.findById(user.id);
      return updatedUser.toJSON();
   } catch (error) {
      console.log(error);
   }
}

export async function insertOne(user: IUser) {
   try {
      const newUser = new User(user)
      await newUser.save();
      return newUser.toJSON();
   } catch (error) {
      console.log(error);
   }
}

export async function deleteOne(id: string) {
   try {
      const result = await User.findByIdAndDelete(id);
      return result.toJSON();
   } catch (error) {
      console.log(error);
   }
}
