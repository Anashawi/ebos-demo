import { NextApiRequest, NextApiResponse } from "next";
import * as service from "../../services/user-analysis.service";
import { getToken } from "next-auth/jwt";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "PUT":
      return await _put(req, res);
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

async function _put(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userAnalysis = req.body;
    const session = await getToken({ req });
    userAnalysis.userId = session!.id;

    const existingUserAnalysis = await service.getOne(userAnalysis.userId);

    if (!existingUserAnalysis) {
      const result = await service.insertOne(userAnalysis);
      res.status(200).json(result);
      return;
    }

    userAnalysis.id = existingUserAnalysis.id;
    const result = await service.updateOne(userAnalysis);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export default handler;
