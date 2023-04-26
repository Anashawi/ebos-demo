import { NextApiRequest, NextApiResponse } from "next";
import * as service from "../../services/user-non-customers.service";
import { getToken } from "next-auth/jwt";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "PUT":
      return await _put(req, res);
    case "POST":
      return await _post(req, res);
    case "GET":
      return _get(req, res);
  }
}

async function _get(req: NextApiRequest, res: NextApiResponse) {
  try {

    const sessionUser: any = await getToken({ req });

    if (!sessionUser?.id) throw new Error("You are not logged in !");

    const result = await service.getOne(sessionUser.id);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function _post(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userNonCustomer = req.body;
    console.log("user customer from the handler", userNonCustomer)
    const result = await service.insertOne(userNonCustomer);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function _put(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userNonCustomer = req.body;
    console.log("user customer from the handler", userNonCustomer)
    const result = await service.updateOne(userNonCustomer);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export default handler;
