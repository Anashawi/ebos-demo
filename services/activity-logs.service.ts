import {
  IActivityLogs,
  ActivityLogs,
  ActivityLogsAttrs,
} from "../models/activity-logs";
import { dbConnect } from "./db.service";

export async function getAll(query?: { searchText?: any }) {
  try {
    await dbConnect();
    let result;
    if (query && !!Object.keys(query).length) {
      result = await ActivityLogs.find({
        action: { $regex: query.searchText },
      });
    } else {
      result = await ActivityLogs.find();
    }
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function getOne(id: string) {
  try {
    await dbConnect();
    const result = await ActivityLogs.findById(id);
    return result?.toJSON();
  } catch (error) {
    console.log(error);
  }
}

export async function updateOne(logs: IActivityLogs) {
  try {
    await dbConnect();
    const result = await ActivityLogs.updateOne(
      { _id: logs.id },
      { $set: { ...logs } }
    );
    const updatedLog = await ActivityLogs.findById(logs.id);
    return updatedLog?.toJSON();
  } catch (error) {
    console.log(error);
  }
}

export async function insertOne(logs: IActivityLogs) {
  try {
    await dbConnect();
    const newLog = new ActivityLogs(logs);
    await newLog.save();
    return newLog?.toJSON();
  } catch (error) {
    console.log(error);
  }
}

export async function deleteOne(id: string) {
  try {
    await dbConnect();
    const deleteLog = await ActivityLogs.findByIdAndDelete(id);
    return deleteLog?.toJSON();
  } catch (error) {
    console.log(error);
  }
}
