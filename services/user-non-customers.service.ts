import { IUserNonCustomers, UserNonCustomers } from "../models/user-non-customers";

export async function getOne(currentUserId: string) {
   try {
      const result = await UserNonCustomers.findOne({ userId: currentUserId });

      return result ? result.toJSON() : result;
   } catch (error) {
      console.log(error);
   }
}

export async function updateOne(frontEndUserNonCustomers: IUserNonCustomers) {
   try {
      const updateResult = await UserNonCustomers.updateOne(
         { _id: frontEndUserNonCustomers.id },
         {
            $set: { ...frontEndUserNonCustomers },
         }
      );

      const updatedUserNonCustomers = await UserNonCustomers.findById(frontEndUserNonCustomers.id);
      return updatedUserNonCustomers.toJSON();
   } catch (error) {
      console.log(error);
   }
}

export async function insertOne(userNonCustomers: IUserNonCustomers) {
   try {
      const frontEndUserNonCustomers = new UserNonCustomers(userNonCustomers)
      await frontEndUserNonCustomers.save();
      return frontEndUserNonCustomers.toJSON();
   } catch (error) {
      console.log(error);
   }
}
