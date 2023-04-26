import { IUserGoal, UserGoal } from "../models/user-goal";

export async function getOne(currentUserId: string, ISODateString: string) {
   try {
      const result = await UserGoal.findOne({ userId: currentUserId });

      return result ? result.toJSON() : result;
   } catch (error) {
      console.log(error);
   }
}

export async function updateOne(frontEndUserGoal: IUserGoal) {
   try {
      const updateResult = await UserGoal.updateOne(
         { _id: frontEndUserGoal.id },
         {
            $set: { ...frontEndUserGoal },
         }
      );

      const updatedUserGoal = await UserGoal.findById(frontEndUserGoal.id);
      return updatedUserGoal.toJSON();
   } catch (error) {
      console.log(error);
   }
}

export async function insertOne(userGoal: IUserGoal) {
   try {
      console.log("user goal from the service", userGoal)

      const frontEndUserGoal = new UserGoal(userGoal)
      await frontEndUserGoal.save();
      return frontEndUserGoal.toJSON();
   } catch (error) {
      console.log(error);
   }
}