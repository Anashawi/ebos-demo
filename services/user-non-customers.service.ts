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
      console.log("frontEndUserNonCustomers from service ", frontEndUserNonCustomers);
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
      console.log("user customer from the service", userNonCustomers)

      const frontEndUserNonCustomers = new UserNonCustomers(userNonCustomers)
      await frontEndUserNonCustomers.save();
      return frontEndUserNonCustomers.toJSON();
   } catch (error) {
      console.log(error);
   }
}
