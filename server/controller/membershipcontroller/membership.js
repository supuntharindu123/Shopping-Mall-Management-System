import User from "../../models/User.js";
import Package from "../../models/Package.js";
import Transaction from "../../models/Transaction.js";
import Reward from "../../models/Reward.js";
import purchasepackage from "../../models/purchasepackage.js";
import PDF from "pdfkit";

export async function Purchasing(req, res) {
  try {
    const { username, totalamount, category } = req.body;
    let discount = 0,
      amount = totalamount;

    const user = await User.findOne({ name: username });
    const packagedetails = await Package.findOne({ category: category });

    const checkpkg = user.membershipPackage.find(
      (x) => x.packagename === packagedetails.name
    );
    console.log("packagedetails", checkpkg);

    let points = user.points;

    console.log(user);
    if (checkpkg) {
      if (checkpkg.packagename === "Foodie Delight" && category === "food") {
        discount = totalamount * 0.1;
        amount = totalamount - discount;
        points += totalamount;
      } else if (
        checkpkg.packagename === "Fashionista" &&
        category === "fashion"
      ) {
        discount = totalamount * 0.15;
        amount = totalamount - discount;
        points += totalamount * 2;
      } else {
        discount = 0;
        amount = totalamount;
      }
    } else {
      return res.status(404).json({ message: "User not found" });
    }

    const transaction = new Transaction({
      username,
      totalamount,
      discount,
      amount,
      category,
    });
    await transaction.save();

    user.purchaseHistory.push({
      transactionId: transaction._id,
      amount,
      category,
    });

    const membershipPackage = await Package.findOne({
      name: user.membershipPackage,
    });

    // Update user points if membership package exists
    if (membershipPackage) {
      user.points += amount * membershipPackage.pointsPerDollar;
    }

    user.points = points;
    // Save updated user data
    await user.save();

    res
      .status(201)
      .json({ message: "Purchase logged successfully", transaction });
  } catch (error) {
    console.error("Error in Purchasing function:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function transactionsdetails(req, res) {
  try {
    const transactions = await Transaction.find().sort({ createdAt: 1 }); // Sort by date in ascending order
    res.json(transactions); // Ensure the transactions are sent in the response
  } catch (err) {
    console.error("Error in transactionsdetails:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function removeTransaction(req, res) {
  try {
    const transactionId = req.params.transactionId;
    const transaction = await Transaction.findByIdAndDelete(transactionId);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error("Error in removeTransaction:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function pkgDetails(req, res) {
  try {
    const id = req.params.id;
    const packages = await Package.findById(id);
    console.log("packages", packages);
    res.status(200).json(packages);
  } catch (error) {
    console.error("Error in pkgDetails:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function removepkg(req, res) {
  try {
    const id = req.params.id;
    const packages = await Package.findByIdAndDelete(id);
    console.log("packages", packages);
    res.status(200).json(packages);
  } catch (error) {
    console.error("Error in pkgDetails:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function purchasepackages(req, res) {
  try {
    const { userId, packageId } = req.body;

    // Validate user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const packageData = await Package.findById(packageId);
    if (!packageData) {
      return res.status(404).json({ message: "Package not found" });
    }

    // Check if user already has this package
    const existingPackage = user.membershipPackage.find(
      (pkg) =>
        pkg.packagename === packageData.name &&
        new Date(pkg.activatedate) >
          new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    );

    if (existingPackage) {
      return res.status(400).json({
        message: "Package already active!",
        expiryDate: existingPackage.activatedate,
      });
    }

    // Add new package
    user.membershipPackage.push({
      packagename: packageData.name,
      activatedate: new Date(),
      pointsPerDollar: packageData.pointsPerDollar,
      benifits: packageData.benefits,
      status: "active",
    });

    // Create purchase record
    const purchaseRecord = new purchasepackage({
      userId,
      packageId,
      packagename: packageData.name,
      purchaseDate: new Date(),
      status: "active",
    });

    await purchaseRecord.save();
    await user.save();

    res.status(200).json({
      success: true,
      message: "Package purchased successfully",
      user,
      purchaseRecord,
    });
  } catch (error) {
    console.error("Error in purchasepackages:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getUserMembershipPackage(req, res) {
  try {
    const pkg = await Package.find();
    if (!pkg) {
      return res.status(404).json({ message: "Packages not found" });
    }
    res.status(200).json(pkg);
  } catch (error) {
    console.error("Error in getUserMembershipPackage:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getAllPackages(req, res) {
  try {
    const packages = await Package.find();
    if (!packages) {
      return res.status(404).json({ message: "No packages found" });
    }
    const pkg = packages.map((pkg) => {
      name = pkg.name;
    });
    res.status(200).json(pkg);
  } catch (error) {
    console.error("Error in getAllPackages:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const updatePackage = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedPackage = await Package.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    res.status(200).json(updatedPackage);
  } catch (error) {
    console.error("Error updating package:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export async function Rewards(req, res) {
  const { userId, rewardId } = req.body;
  const user = await User.findById(userId);
  const reward = await Reward.findById(rewardId);

  if (user.points >= reward.pointsRequired) {
    user.points -= reward.pointsRequired;
    await user.save();
    res.json({ message: "Reward redeemed successfully" });
  } else {
    res.status(400).json({ message: "Not enough points" });
  }
}

export async function addMembershipPackage(req, res) {
  try {
    const {
      name,
      monthlyCost,
      benefits,
      pointsPerDollar,
      description,
      category,
      discount,
    } = req.body;

    if (!name || !monthlyCost || !pointsPerDollar) {
      return res
        .status(400)
        .json({ message: "All fields are required except benefits" });
    }

    const membershipPackage = new Package({
      name,
      monthlyCost,
      benefits,
      pointsPerDollar,
      description,
      category,
      discount,
    });

    await membershipPackage.save();
    res.status(201).json({
      message: "Package added successfully",
      membershipPackage,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export async function addReward(req, res) {
  try {
    const { name, pointsRequired, category } = req.body;

    // Validate request data
    if (!name || !pointsRequired || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new reward
    const newReward = new Reward({
      name,
      pointsRequired,
      category,
    });

    // Save reward to database
    await newReward.save();
    res
      .status(201)
      .json({ message: "Reward added successfully", reward: newReward });
  } catch (error) {
    console.error("Error adding reward:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const generateGoal = async (userId) => {
  const user = await User.findById(userId);
  const transactions = await Transaction.find({ userId });

  // Analyze spending patterns
  const totalSpending = transactions.reduce((sum, txn) => sum + txn.amount, 0);
  const categorySpending = transactions.reduce((acc, txn) => {
    acc[txn.category] = (acc[txn.category] || 0) + txn.amount;
    return acc;
  }, {});

  // Find the category with the highest spending
  const topCategory = Object.keys(categorySpending).reduce((a, b) =>
    categorySpending[a] > categorySpending[b] ? a : b
  );

  // Generate a goal based on the top category
  const goalAmount = Math.round(categorySpending[topCategory] * 1.2); // 20% increase
  return `Spend $${goalAmount} on ${topCategory} to earn a 15% discount`;
};

export async function Goals(req, res) {
  const goal = await generateGoal(req.params.userId);
  res.json({ goal });
}

const recommendRewards = async (userId) => {
  const user = await User.findById(userId);
  const transactions = await Transaction.find({ userId });
  const rewards = await Reward.find();

  // Analyze spending patterns
  const categorySpending = transactions.reduce((acc, txn) => {
    acc[txn.category] = (acc[txn.category] || 0) + txn.amount;
    return acc;
  }, {});

  // Find the category with the highest spending
  const topCategory = Object.keys(categorySpending).reduce((a, b) =>
    categorySpending[a] > categorySpending[b] ? a : b
  );

  // Filter rewards for the top category
  const recommendedRewards = rewards.filter(
    (reward) =>
      reward.category === topCategory && reward.pointsRequired <= user.points
  );

  return recommendedRewards;
};

export async function Reccommend(req, res) {
  const rewards = await recommendRewards(req.params.userId);
  res.json({ rewards });
}
