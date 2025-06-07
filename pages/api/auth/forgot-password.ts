import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import crypto from "crypto";
import sendEmail from "@/utils/sendEmail";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  await connectDB();

  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const token = crypto.randomBytes(32).toString("hex");
  const expiry = Date.now() + 3600000; // 1 hour

  user.resetToken = token;
  user.resetTokenExpiry = expiry;
  await user.save();

  const resetLink = `${process.env.APP_URL}/reset-password?token=${token}`;
  await sendEmail(email, "Reset Password", `Reset your password here: ${resetLink}`);

  res.status(200).json({ message: "Password reset email sent" });
}
