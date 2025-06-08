import User from "../../models/User.js";
import Package from "../../models/Package.js";
import Transaction from "../../models/Transaction.js";
import Reward from "../../models/Reward.js";
import purchasepackage from "../../models/purchasepackage.js";
import Shop from "../../models/Shop.js";
import PDFDocument from "pdfkit";
import ParkingCategory from "../../models/ParkingCategory.js";
import mongoose from "mongoose";
import RewardRedemption from "../../models/RewardRedemption.js";
export async function Purchasing(req, res) {
  try {
    const {
      userId,
      shopId,
      shopName,
      items,
      totalAmount,
      pointsEarned,
      appliedDiscount,
      discountAddedPackage,
      finalTotal,
    } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const order = new Transaction({
      userId: userId,
      shopId,
      shopName,
      items: items.map((item) => ({
        itemId: item.itemId,
        itemName: item.itemName,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount,
      pointsEarned,
      appliedDiscount: appliedDiscount,
      discountAddedPackage,
      finalTotal,
    });

    await order.save();

    user.points += pointsEarned;
    await user.save();

    return res
      .status(201)
      .json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error("Error in Purchasing function:", error);
    return res.status(500).json({ message: "Internal server error" });
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
      category: packageData.category,
      discount: packageData.discount,
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

    if (!packages || packages.length === 0) {
      return res.status(404).json({ message: "No packages found" });
    }

    // Return full package details instead of just names
    const formattedPackages = packages.map((pkg) => ({
      _id: pkg._id,
      name: pkg.name,
      monthlyCost: pkg.monthlyCost,
      benefits: pkg.benefits,
      pointsPerDollar: pkg.pointsPerDollar,
      description: pkg.description,
      category: pkg.category,
      discount: pkg.discount,
    }));

    res.status(200).json(formattedPackages);
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
    const {
      name,
      pointsRequired,
      benefits,
      category,

      description,
    } = req.body;

    // Validate required fields
    if (!name || !pointsRequired || !benefits || !category) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    // Create a new reward
    const newReward = new Reward({
      name,
      pointsRequired,
      benefits,
      category,

      description,
    });

    // Save to DB
    await newReward.save();

    res.status(201).json({
      message: "Reward added successfully",
      reward: newReward,
    });
  } catch (error) {
    console.error("Error adding reward:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateReward(req, res) {
  try {
    const { id } = req.params;
    const { name, pointsRequired, benefits, category, description } = req.body;

    // Validate required fields
    if (!name || !pointsRequired || !benefits || !category) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    // Find the reward
    const reward = await Reward.findById(id);
    if (!reward) {
      return res.status(404).json({ message: "Reward not found" });
    }

    // Update the reward document
    const updatedReward = await Reward.findByIdAndUpdate(
      id,
      {
        name,
        pointsRequired,
        benefits,
        category,
        description,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Reward updated successfully",
      reward: updatedReward,
    });
  } catch (error) {
    console.error("Error updating reward:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}

export async function deleteReward(req, res) {
  try {
    const { id } = req.params;

    // Find the reward
    const reward = await Reward.findById(id);
    if (!reward) {
      return res.status(404).json({ message: "Reward not found" });
    }

    // Find and update the package
    const pkg = await Package.findOne({ name: reward.packagename });
    if (pkg) {
      // Remove reward from package's rewards array
      pkg.rewards = pkg.rewards.filter((r) => r.rewardname !== reward.name);

      // Remove benefits associated with this reward
      pkg.benefits = pkg.benefits.filter((b) => !reward.benefits.includes(b));

      await pkg.save();
    }

    // Delete the reward
    await Reward.findByIdAndDelete(id);

    res.status(200).json({
      message: "Reward deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting reward:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}

export async function getAllRewards(req, res) {
  try {
    const rewards = await Reward.find().select("-__v");

    if (!rewards || rewards.length === 0) {
      return res.status(404).json({
        message: "No rewards found",
      });
    }

    // Format rewards with necessary fields
    const formattedRewards = rewards.map((reward) => ({
      _id: reward._id,
      name: reward.name,
      pointsRequired: reward.pointsRequired,
      benefits: reward.benefits,
      category: reward.category,
      description: reward.description,
      isActive: reward.isActive,
    }));

    res.status(200).json(formattedRewards);
  } catch (error) {
    console.error("Error in getAllRewards:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}

export async function getRewardById(req, res) {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid reward ID format",
        rewardId: id,
      });
    }

    // Find reward by ID
    const reward = await Reward.findById(id).select("-__v");

    if (!reward) {
      return res.status(404).json({
        success: false,
        message: "Reward not found",
        rewardId: id,
      });
    }

    // Format reward data
    const formattedReward = {
      _id: reward._id,
      name: reward.name,
      pointsRequired: reward.pointsRequired,
      benefits: reward.benefits,
      description: reward.description,
      isActive: reward.isActive,
    };

    res.status(200).json({
      success: true,
      reward: formattedReward,
    });
  } catch (error) {
    console.error("Error in getRewardById:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}

export async function getRewardsByPackageName(req, res) {
  try {
    const { packageName } = req.params;

    // Find package by name
    const package1 = await Package.findOne({ name: packageName });

    if (!package1) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      });
    }

    // Check if package has rewards
    if (!package1.rewards || package1.rewards.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No rewards found for this package",
        rewards: [],
      });
    }

    // Format and return rewards
    const rewards = package1.rewards.map((reward) => ({
      _id: reward._id,
      rewardname: reward.rewardname,
      pointsRequired: reward.pointsRequired,
      isActive: reward.isActive,
      packageName: package1.name,
      packageDiscount: package1.discount,
      packageCategory: package1.category,
    }));

    res.status(200).json({
      success: true,
      rewards,
      packageDetails: {
        name: package1.name,
        benefits: package1.benefits,
        pointsPerDollar: package1.pointsPerDollar,
        discount: package1.discount,
        category: package1.category,
      },
    });
  } catch (error) {
    console.error("Error in getRewardsByPackageName:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
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

export async function getTransactionsByUserId(req, res) {
  try {
    const userId = req.params.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid userId format" });
    }

    const transactiondata = await Transaction.find({
      userId: new mongoose.Types.ObjectId(userId),
    });

    if (!transactiondata.length) {
      return res
        .status(404)
        .json({ message: "No transactions found for this user" });
    }

    res.status(200).json(transactiondata);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server Error");
  }
}

export async function redeemReward(req, res) {
  try {
    const { userId, username, rewardDetails, shopDetails } = req.body;

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if user has enough points
    if (user.points < rewardDetails.pointsRequired) {
      return res.status(400).json({
        success: false,
        message: "Insufficient points",
        currentPoints: user.points,
        requiredPoints: rewardDetails.pointsRequired,
      });
    }

    // Create redemption record
    const redemption = new RewardRedemption({
      userId,
      username,
      rewardDetails,
      shopDetails,
      redeemedAt: new Date(),
    });

    // Save redemption record
    await redemption.save();
    console.log(`xxxxx`, redemption);

    // Deduct points from user
    user.points -= rewardDetails.pointsRequired;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Reward redeemed successfully",
      updatedPoints: user.points,
      redemption,
    });
  } catch (error) {
    console.error("Error redeeming reward:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to redeem reward",
      error: error.message,
    });
  }
}

export async function getRewardRedemptionsByUserId(req, res) {
  try {
    const { userId } = req.params;

    // Validate userId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
      });
    }

    // Find all redemptions for the user
    const redemptions = await RewardRedemption.find({ userId })
      .sort({ redeemedAt: -1 }) // Sort by most recent first
      .select("-__v"); // Exclude version key

    // Check if any redemptions exist
    if (!redemptions || redemptions.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No reward redemptions found for this user",
        redemptions: [],
      });
    }

    // Format and return the redemptions
    const formattedRedemptions = redemptions.map((redemption) => ({
      _id: redemption._id,
      rewardDetails: {
        rewardId: redemption.rewardDetails.rewardId,
        rewardName: redemption.rewardDetails.rewardName,
        pointsRequired: redemption.rewardDetails.pointsRequired,
        benefits: redemption.rewardDetails.benefits,
        category: redemption.rewardDetails.category,
      },
      shopDetails: redemption.shopDetails,
      redeemedAt: redemption.redeemedAt,
    }));

    return res.status(200).json({
      success: true,
      count: formattedRedemptions.length,
      redemptions: formattedRedemptions,
    });
  } catch (error) {
    console.error("Error fetching reward redemptions:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch reward redemptions",
      error: error.message,
    });
  }
}

export async function getAllRedemptionHistory(req, res) {
  try {
    // Find all redemptions
    const redemptions = await RewardRedemption.find()
      .sort({ redeemedAt: -1 })
      .select("-__v");

    // Check if any redemptions exist
    if (!redemptions || redemptions.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No reward redemptions found",
        redemptions: [],
      });
    }

    // Format and return the redemptions
    const formattedRedemptions = redemptions.map((redemption) => ({
      _id: redemption._id,
      username: redemption.username,
      rewardDetails: {
        rewardId: redemption.rewardDetails.rewardId,
        rewardName: redemption.rewardDetails.rewardName,
        pointsRequired: redemption.rewardDetails.pointsRequired,
        benefits: redemption.rewardDetails.benefits,
        category: redemption.rewardDetails.category,
      },
      shopDetails: redemption.shopDetails,
      redeemedAt: redemption.redeemedAt,
    }));

    return res.status(200).json({
      success: true,
      count: formattedRedemptions.length,
      redemptions: formattedRedemptions,
    });
  } catch (error) {
    console.error("Error fetching all reward redemptions:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch reward redemptions",
      error: error.message,
    });
  }
}

export async function packagereport(req, res) {
  try {
    const packages = await Package.find();

    const doc = new PDFDocument();
    const filename = `Membership_Report_${Date.now()}.pdf`;

    res.setHeader("Content-disposition", `attachment; filename=${filename}`);
    res.setHeader("Content-type", "application/pdf");

    doc.pipe(res);

    doc.fontSize(20).text("Membership Package Report", { align: "center" });
    doc.moveDown();

    packages.forEach((pkg, index) => {
      doc.fontSize(14).text(`${index + 1}. ${pkg.name} (${pkg.category})`, {
        underline: true,
      });
      doc.fontSize(12).text(`Monthly Cost: $${pkg.monthlyCost}`);
      doc.text(`Points Per Dollar: ${pkg.pointsPerDollar}`);
      doc.text(`Discount: ${pkg.discount ?? "N/A"}`);
      doc.text(`Description: ${pkg.description ?? "No description"}`);
      doc.text("Benefits:");
      pkg.benefits.forEach((b, i) => doc.text(`  - ${b}`));
      doc.text("Rewards:");
      pkg.rewards.forEach((r) => {
        doc.text(
          `  • ${r.rewardname || "Unnamed Reward"} - Points: ${
            r.pointsRequired ?? 0
          } | Active: ${r.isActive ? "Yes" : "No"}`
        );
      });
      doc.moveDown();
    });

    doc.end();
  } catch (err) {
    console.error("Error generating PDF:", err);
    res.status(500).json({ error: "Failed to generate report" });
  }
}
