import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function RegisterUser(req, res) {
  const { name, email, password, membershipPackage } = req.body;
  const user = new User({ name, email, password, membershipPackage });
  await user.save();
  res.status(201).json({ message: "User registered successfully" });
}

export async function LoginUser(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ userId: user._id }, "secret_key");
    res.json("Login successful");
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
}

export async function GetUserDetails(req, res) {
  const username = req.params.username;
  const user = await User.findOne({ name: username });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const userdetails = {
    name: user.name,
    email: user.email,
    membershipPackage: user.membershipPackage,
    points: user.points,
  };
  res.json(userdetails);
}
