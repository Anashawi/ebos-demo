import { NextApiRequest, NextApiResponse } from "next";
import * as service from "../../services/futures.service";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "PUT":
      return await _put(req, res);
    case "DELETE":
      return await _delete(req, res);
    case "GET":
      return _get(req, res);
  }
}

async function _get(req: NextApiRequest, res: NextApiResponse) {
  try {
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
    const futures = req.body;
    const result = await service.updateAll(futures);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function _delete(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;;

    const result = await service.deleteOne(id as string);
    res.status(200).json(result);
  } catch (error: any) {
    if (error instanceof Error)
      res.status(500).json({
        message: error.message,
      });
  }
}

export default handler;
