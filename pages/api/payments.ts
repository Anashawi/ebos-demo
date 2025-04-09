import { NextApiRequest, NextApiResponse } from "next";
import * as service from "../../services/payments.service";
// import { getToken } from "next-auth/jwt";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      return _post(req, res);
    default:
      return res.status(405).json({ message: "Method Not Allowed" });
  }
}

async function _post(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id, orderId } = req.body;

    if (!id && !orderId) {
      return res.status(400).json({ message: "Order ID is required" });
    }

    const response = id
      ? await service.createSession(id)
      : await service.checkPaymentStatus(orderId);
    return res.status(response.status).json(response.data); // Extract only `data`
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export default handler;
