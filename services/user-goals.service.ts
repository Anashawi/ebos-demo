import { IGoal } from "../models/types";
import { IUserGoal, UserGoal } from "../models/user-goal";

export async function getOne(currentUserId: string, ISODateString: string) {
   try {
      const result = await UserGoal.findOne({ userId: currentUserId });

      if (ISODateString !== "undefined" && ISODateString !== "") {
         result.goals = result.goals.filter((g: IGoal) => g.date === ISODateString);
      }
      return result.toJSON();
   } catch (error) {
      console.log(error);
   }
}

export async function getAllLookup() {
   try {
      const result = await UserGoal.find({}, 'fullName isActive');
      result.forEach(item => {
         item._id = item._id.toString();
      });
      return result;
   } catch (error) {
      console.log(error);
   }
}

export async function updateOne(frontEndUserGoal: IUserGoal) {
   try {
      const findOneResult = await UserGoal.findOne({ _id: frontEndUserGoal.id });
      frontEndUserGoal.goals = [...findOneResult.goals, ...frontEndUserGoal.goals]; // has to be replaced

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
      const frontEndUserGoal = new UserGoal(userGoal)
      await frontEndUserGoal.save();
      return frontEndUserGoal.toJSON();
   } catch (error) {
      console.log(error);
   }
}

export async function deleteOne(id: string) {
   try {
      const result = await UserGoal.findByIdAndDelete(id);
      return result.toJSON();
   } catch (error) {
      console.log(error);
   }
}