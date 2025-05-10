import { IUserOrganizations, UserOrganizations } from "../models/organization";
import { dbConnect } from "./db.service";

export async function getOne(currentUserId: string) {
  let response = {
    status: 200,
    message: "ok",
    data: undefined,
  };
  try {
    await dbConnect();
    const result = await UserOrganizations.findOne({
      userId: currentUserId,
    });

    if (!result) {
      response.status = 204;
      response.message = "there are no organizations stored";
    } else {
      response.data = result.toJSON();
    }

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function insertOne(userOrganizations: IUserOrganizations) {
  try {
    await dbConnect();
    // const frontEndUserOrganizations = new UserOrganizations(
    //     userOrganizations
    // );
    const { id, ...dataToInsert } = userOrganizations;

    const frontEndUserOrganizations = new UserOrganizations(dataToInsert);
    await frontEndUserOrganizations.save();
    return frontEndUserOrganizations?.toJSON();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateOne(userOrganizations: IUserOrganizations) {
  try {
    await dbConnect();
    const updateResult = await UserOrganizations.updateOne(
      { _id: userOrganizations.id },
      {
        $set: { ...userOrganizations },
      }
    );

    const updatedUserOrganization = await UserOrganizations.findById(
      userOrganizations.id
    );
    return updatedUserOrganization?.toJSON();
  } catch (error) {
    console.log(error);
    throw error;
  }
}
