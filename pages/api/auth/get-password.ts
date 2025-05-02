import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "../../../services/db.service";
import { User } from "../../../models/user"; // your User mongoose model
import bcrypt from "bcryptjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  await dbConnect();

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const password = user.password; // you must be careful if it's hashed

  return res
    .status(200)
    .json({ email: user.email, name: user.fullName, password });
}
