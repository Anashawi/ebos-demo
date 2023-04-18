import { NextApiRequest, NextApiResponse } from "next";
import * as service from "../../services/products.service";
import { getSession } from "next-auth/react";
import objectPath from "object-path";
import { getToken } from "next-auth/jwt";

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
    const sessionUser: any = await getToken({ req });

    if (!sessionUser?.id) throw new Error("You are not logged in !");

    const result = await service.getAll(sessionUser.id);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function _put(req: NextApiRequest, res: NextApiResponse) {
  try {
    const products = req.body;
    const result = await service.updateAll(products);
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
