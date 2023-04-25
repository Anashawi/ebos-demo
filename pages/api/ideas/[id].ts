import { NextApiRequest, NextApiResponse } from "next";
import * as service from "../../../services/ideas.service";
import { getToken } from "next-auth/jwt";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "DELETE":
      return _delete(req, res);
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
