import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  await connectDB();

  const { token, newPassword } = req.body;

  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() },
  });

  if (!user) return res.status(400).json({ message: "Invalid or expired token" });

  user.password = newPassword;
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
  await user.save();

  res.status(200).json({ message: "Password reset successful" });
}
