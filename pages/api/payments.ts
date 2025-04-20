import { NextApiRequest, NextApiResponse } from "next";
import * as service from "../../services/payments.service";
// import { getToken } from "next-auth/jwt";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return _get(req, res);
    case "POST":
      return _post(req, res);
    case "DELETE":
      return _delete(req, res);
    default:
      return res.status(405).json({ message: "Method Not Allowed" });
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
async function _post(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { amount, orderId } = req.body;

    const response =
      orderId && amount
        ? await service.createSession(orderId, amount)
        : await service.insertOne(req.body);
    if (response.status) {
      return res
        .status(response.status || 200)
        .json(response?.data || response);
    } else {
      return res.status(200).json(response);
    }
    // Extract only `data`
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function _delete(req: NextApiRequest, res: NextApiResponse) {
  try {
    //@ts-ignore
    const { id } = req.body;
    if (!id) throw new Error("Payment ID is required!");
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
