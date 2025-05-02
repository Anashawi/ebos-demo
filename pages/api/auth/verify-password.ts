// pages/api/auth/verify-password.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { checkPassword } from "../../../services/auth.service"; // make sure updatePassword exists
import { getServerSession } from "next-auth/next";
import { authOptions } from "./[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  //@ts-ignore
  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user?.email) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { password } = req.body;

  if (!password) {
    return res
      .status(400)
      .json({ message: "Current and new passwords are required." });
  }

  try {
    const isValid = await checkPassword({
      email: session.user.email,
      password,
    });

    if (!isValid) {
      return res.status(401).json({ message: "Invalid current password" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message || "Server error" });
  }
}
