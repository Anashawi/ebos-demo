import { IUserCustomers, UserCustomers } from "../models/user-customers";

export async function getOne(currentUserId: string) {
   try {
      const result = await UserCustomers.findOne({ userId: currentUserId });

      return result ? result.toJSON() : result;
   } catch (error) {
      console.log(error);
   }
}

export async function updateOne(frontEndUserCustomers: IUserCustomers) {
   try {
      const updateResult = await UserCustomers.updateOne(
         { _id: frontEndUserCustomers.id },
         {
            $set: { ...frontEndUserCustomers },
         }
      );

      const updatedUserCustomers = await UserCustomers.findById(frontEndUserCustomers.id);
      return updatedUserCustomers.toJSON();
   } catch (error) {
      console.log(error);
   }
}

export async function insertOne(userCustomers: IUserCustomers) {
   try {
      const frontEndUserCustomers = new UserCustomers(userCustomers)
      await frontEndUserCustomers.save();
      return frontEndUserCustomers.toJSON();
   } catch (error) {
      console.log(error);
   }
}