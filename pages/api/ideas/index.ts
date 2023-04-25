import { NextApiRequest, NextApiResponse } from "next";
import * as service from "../../../services/ideas.service";
import { getToken } from "next-auth/jwt";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      return await _post(req, res);
    case "GET":
      return _get(req, res);
    case "DELETE":
      return _delete(req, res);
  }
}

async function _get(req: NextApiRequest, res: NextApiResponse) {
  try {
    const sessionUser: any = await getToken({ req });

    if (!sessionUser?.id) throw new Error("You are not logged in !");

    const result = await service.getAll();
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function _post(req: NextApiRequest, res: NextApiResponse) {
  try {
    const idea = req.body;
    const result = await service.insertOne(idea);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function _delete(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  try {
    const result = await service.deleteOne(id as string);

    res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
}

export default handler;
