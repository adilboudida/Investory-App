import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { generateToken } from "@/utils/generateToken";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  await connectDB();

  const { email, password, role } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: "User already exists" });

  const user = await User.create({ email, password, role });

  const token = generateToken(user);
  res.status(201).json({ token, user: { email: user.email, role: user.role } });
}
