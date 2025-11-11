import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "./backend/models/categoryModel.js";
import Product from "./backend/models/productModel.js";
import User from "./backend/models/userModel.js";
import Order from "./backend/models/orderModel.js";

dotenv.config();

const clearDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Delete all data except the admin user
    const deletedCategories = await Category.deleteMany({});
    const deletedProducts = await Product.deleteMany({});
    const deletedOrders = await Order.deleteMany({});
    const deletedUsers = await User.deleteMany({ 
      email: { $ne: "admin@example.com" } // Keep admin user
    });

    console.log("\n🗑️  Data Cleared Successfully!");
    console.log("-----------------------------------");
    console.log(`✅ Categories deleted: ${deletedCategories.deletedCount}`);
    console.log(`✅ Products deleted: ${deletedProducts.deletedCount}`);
    console.log(`✅ Orders deleted: ${deletedOrders.deletedCount}`);
    console.log(`✅ Users deleted: ${deletedUsers.deletedCount}`);
    console.log("-----------------------------------");
    console.log("ℹ️  Admin user preserved (admin@example.com)");
    console.log("-----------------------------------");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error clearing database:", error);
    process.exit(1);
  }
};

clearDatabase();
