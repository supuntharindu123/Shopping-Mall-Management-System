import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function RegisterUser(req, res) {
  try {
    const { name, email, phoneNumber, password } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Check if username already exists
    const existingUsername = await User.findOne({ name });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already taken" });
    }
    const user = new User({
      name,
      email,
      password,
      phoneNumber,
    });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
      message:
        error.code === 11000
          ? "Email or username already exists"
          : "Internal server error",
    });
  }
}

export async function LoginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET || "secret_key",
      { expiresIn: "24h" }
    );

    res.json({
      message: "Login successful",
      token,
      role: user.role,
      username: user.name,
      id: user._id,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function GetUserDetails(req, res) {
  const username = req.params.username;
  const user = await User.findOne({ name: username });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const userdetails = {
    id: user._id,
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber,
    membershipPackage: user.membershipPackage,
    points: user.points,
  };
  res.json(userdetails);
}
