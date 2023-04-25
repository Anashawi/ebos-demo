import { IUserIdea, UserIdea } from '../models/user-idea';
import { IIdea } from "../models/types";
import { ObjectId } from 'mongodb';

export async function getAll(currentUserId: string) {
   try {
      const result = await UserIdea.findOne({ userId: currentUserId });
      return result.toJSON();
   } catch (error) {
      console.log(error);
   }
}

export async function getAllLookup(currentUserId: string) {
   try {
      const result = await UserIdea.findOne({ userId: currentUserId });
      return result;
   } catch (error) {
      console.log(error);
   }
}

export async function insertOrUpdateOne(idea: IIdea, sessionUser: any) {
   try {

      if (!sessionUser?.id) throw new Error("You are not logged in !");

      const result = await UserIdea.findOne({ userId: sessionUser.id });

      const userIdea: IUserIdea = {
         id: result?._id ?? "",
         userId: sessionUser.id,
         ideas: []
      };

      if (result?.ideas?.length) {
         userIdea.ideas = [...result.ideas, { ...idea }];
      } else {
         userIdea.ideas = [{ ...idea }];
      }

      if (result) { // update ... otherwise insert 
         const updateResult = await UserIdea.updateOne(
            { _id: new ObjectId(userIdea.id) },
            {
               $set: { ...userIdea },
            }
         );
         const updatedUserIdea = await UserIdea.findById(userIdea.id);
         return updatedUserIdea.toJSON();
      }

      const newUserIdea = new UserIdea(userIdea)
      await newUserIdea.save();
      return newUserIdea.toJSON();
   } catch (error) {
      console.log(error);
   }
}

export async function deleteOne(uuid: string, sessionUser: any) {
   try {
      console.log("sdf;kdsjflsdhfljsdlkjlj,jkj")
      if (!sessionUser?.id) throw new Error("You are not logged in !");

      const result = await UserIdea.findOne({ userId: sessionUser.id });

      const userIdea: IUserIdea = {
         id: result?._id ?? "",
         userId: sessionUser.id,
         ideas: []
      };

      if (result?.ideas?.length) {
         userIdea.ideas = result.ideas.filter((idea: IIdea) => idea.uuid !== uuid);
      }

      if (result) {
         const updateResult = await UserIdea.updateOne(
            { _id: new ObjectId(userIdea.id) },
            {
               $set: { ...userIdea },
            }
         );
         const updatedUserIdea = await UserIdea.findById(userIdea.id);
         return updatedUserIdea.toJSON();
      }

   } catch (error) {
      console.log(error);
   }
}