import { NextApiRequest, NextApiResponse } from "next";
import * as service from "../../../services/user-ideas.service";
import { getToken } from "next-auth/jwt";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return _get(req, res);
  }
}

async function _get(req: NextApiRequest, res: NextApiResponse) {
  try {
    const sessionUser: any = await getToken({ req });

    if (!sessionUser?.id) throw new Error("You are not logged in !");

    const result = await service.getAllLookup(sessionUser.id);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export default handler;
