import { IIdea, Idea } from './../models/idea';
import objectPath from "object-path";
import { productPagesEnum } from "../models/enums";
import { IProduct } from "../models/types";

export async function getAll() {
   try {
      const result = await Idea.find();
      return result;
   } catch (error) {
      console.log(error);
   }
}

export async function getAllLookup() {
   try {
      const result = await Idea.find({}, 'name');
      // result.forEach((item: IIdea) => {
      //    item._id = item._id.toString();
      // });
      return result;
   } catch (error) {
      console.log(error);
   }
}

export async function insertOne(idea: IIdea) {
   try {
      const newIdea = new Idea(idea)
      await newIdea.save();
      return newIdea.toJSON();
   } catch (error) {
      console.log(error);
   }
}

export async function deleteOne(id: string) {
   try {
      const result = await Idea.findByIdAndDelete(id);
      return result.toJSON();
   } catch (error) {
      console.log(error);
   }
}