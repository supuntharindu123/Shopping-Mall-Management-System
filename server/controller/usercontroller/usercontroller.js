import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import PDFDocument from "pdfkit";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
};

export async function GoogleLogin(req, res) {
  const { credential } = req.body;
  if (!credential) {
    return res.status(400).json({
      message: "Google authentication failed",
      error: "No credential provided",
    });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture, sub: googleId } = payload;

    if (!email) {
      return res.status(400).json({
        message: "Google authentication failed",
        error: "Email not provided by Google",
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name: name,
        email: email,
        googleId: googleId,
        profilePicture: picture,
      });
    }

    const token = generateToken(user);
    res.json({
      message: "Login successful",
      token,
      role: user.role,
      username: user.name,
      id: user._id,
      profilePicture: user.profilePicture,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
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

    const token = generateToken(user);

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

export async function GetUserById(req, res) {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userDetails = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      profilePicture: user.profilePicture,
      membershipPackage: user.membershipPackage,
      points: user.points,
      role: user.role,
    };

    res.status(200).json(userDetails);
  } catch (error) {
    console.error("Error in GetUserById:", error);
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid user ID format" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function GetAllUsers(req, res) {
  try {
    const users = await User.find({}, "-password");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function UpdateUser(req, res) {
  try {
    const userId = req.params.id;
    const { name, email, phoneNumber, role } = req.body;

    // Input validation
    if (!name || !email || !phoneNumber || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate role
    const validRoles = ["user", "admin", "manager"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role specified" });
    }

    // Check if email is already taken by another user
    const existingUser = await User.findOne({ email, _id: { $ne: userId } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Check if name is already taken by another user
    const existingName = await User.findOne({ name, _id: { $ne: userId } });
    if (existingName) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        email,
        phoneNumber,
        role,

        updatedAt: new Date(),
      },
      { new: true, select: "-password" }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",

      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid user ID format" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function DeleteUser(req, res) {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid user ID format" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function userReport(req, res) {
  try {
    const users = await User.find();

    if (!users.length) {
      return res.status(404).json({ message: "No users found." });
    }

    const filename = `Membership_Report_${Date.now()}.pdf`;
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

    const doc = new PDFDocument({ margin: 30, size: "A4" });

    doc.on("error", (err) => {
      console.error("Error in PDF generation:", err);
      res.status(500).end();
    });

    doc.pipe(res);

    doc.fontSize(20).text("User Membership Report", { align: "center" });
    doc.moveDown();

    let i = 0;
    for (const user of users) {
      doc.fontSize(12).text(`${++i}. Name: ${user.name}`);
      doc.text(`   Email: ${user.email}`);
      doc.text(`   Phone: ${user.phoneNumber}`);
      doc.text(`   Role: ${user.role}`);
      doc.text(`   Points: ${user.points}`);
      doc.moveDown(0.5);

      if (user.membershipPackage?.length > 0) {
        user.membershipPackage.forEach((pkg, index) => {
          doc.text(`   - Package ${index + 1}:`);
          doc.text(`     • Name: ${pkg.packagename}`);
          doc.text(
            `     • Activated: ${new Date(
              pkg.activatedate
            ).toLocaleDateString()}`
          );
          doc.text(`     • Points Per $: ${pkg.pointsPerDollar}`);
          doc.text(`     • Discount: ${pkg.discount ?? "N/A"}`);
          doc.text(`     • Category: ${pkg.category ?? "N/A"}`);
          doc.text(
            `     • Benefits: ${
              pkg.benifits?.length ? pkg.benifits.join(", ") : "None"
            }`
          );
        });
      } else {
        doc.text(`   Membership Package: None`);
      }

      doc.moveDown();
    }

    // Properly end the document
    doc.end();

    // Add error handling for the response stream
    res.on("error", (err) => {
      console.error("Error in response stream:", err);
    });
  } catch (error) {
    console.error("Error generating membership report:", error);
    // Only send error response if headers haven't been sent
    if (!res.headersSent) {
      res.status(500).json({ error: "Failed to generate membership report" });
    }
  }
}
