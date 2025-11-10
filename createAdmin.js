import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./backend/models/userModel.js";
import bcrypt from "bcryptjs";

dotenv.config();

const createAdminUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Check if admin already exists
    const adminExists = await User.findOne({ email: "admin@example.com" });
    
    if (adminExists) {
      console.log("Admin user already exists!");
      console.log("Email: admin@example.com");
      process.exit(0);
    }

    // Create admin user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("admin123", salt);

    const admin = await User.create({
      username: "admin",
      email: "admin@example.com",
      password: hashedPassword,
      isAdmin: true,
    });

    console.log("✅ Admin user created successfully!");
    console.log("-----------------------------------");
    console.log("Email: admin@example.com");
    console.log("Password: admin123");
    console.log("-----------------------------------");
    console.log("You can now login and access the admin portal");
    
    process.exit(0);
  } catch (error) {
    console.error("Error creating admin user:", error);
    process.exit(1);
  }
};

createAdminUser();
