import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "./backend/models/categoryModel.js";
import Product from "./backend/models/productModel.js";
import User from "./backend/models/userModel.js";
import Order from "./backend/models/orderModel.js";

dotenv.config();

const clearAllData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Delete ALL data including admin
    const deletedCategories = await Category.deleteMany({});
    const deletedProducts = await Product.deleteMany({});
    const deletedOrders = await Order.deleteMany({});
    const deletedUsers = await User.deleteMany({});

    console.log("\n🗑️  ALL Data Cleared Successfully!");
    console.log("-----------------------------------");
    console.log(`✅ Categories deleted: ${deletedCategories.deletedCount}`);
    console.log(`✅ Products deleted: ${deletedProducts.deletedCount}`);
    console.log(`✅ Orders deleted: ${deletedOrders.deletedCount}`);
    console.log(`✅ Users deleted: ${deletedUsers.deletedCount}`);
    console.log("-----------------------------------");
    console.log("⚠️  ALL users deleted (including admin)");
    console.log("💡 Run 'node createAdmin.js' to recreate admin user");
    console.log("-----------------------------------");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error clearing database:", error);
    process.exit(1);
  }
};

clearAllData();
