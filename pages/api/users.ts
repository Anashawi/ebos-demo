import { User } from "../../models/user";
import { NextApiRequest, NextApiResponse } from "next";
import * as service from "../../services/users.service";
import { getToken } from "next-auth/jwt";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return _get(req, res);
    case "PUT":
      return _put(req, res);
    case "DELETE":
      return _delete(req, res);
  }
}

async function _get(req: NextApiRequest, res: NextApiResponse) {
  try {
    const sessionUser: any = await getToken({ req });

    if (!sessionUser?.id) throw new Error("You are not logged in !");
    if (sessionUser?.role !== "admin") throw new Error("You are not admin!");

    const result = await service.getAll();
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
}
async function _put(req: NextApiRequest, res: NextApiResponse) {
  try {
    const sessionUser: any = await getToken({ req });
    if (!sessionUser?.id) throw new Error("You are not logged in !");
    if (sessionUser?.role !== "admin") throw new Error("You are not admin!");
    const { id, ...updateData } = req.body;
    if (!id) throw new Error("User ID is required!");
    const result = await service.updateOne({ id, ...updateData });
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
}
async function _delete(req: NextApiRequest, res: NextApiResponse) {
  try {
    const sessionUser: any = await getToken({ req });
    if (!sessionUser?.id) throw new Error("You are not logged in !");
    if (sessionUser?.role !== "admin") throw new Error("You are not admin!");
    //@ts-ignore
    const { id } = req.body;
    if (!id) throw new Error("User ID is required!");
    //@ts-ignore
    const result = await service.deleteOne(id);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export default handler;
