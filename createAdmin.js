// Seed (or update) an admin user.
// Usage: npm run create-admin
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import connectDB from "./backend/config/db.js";
import User from "./backend/models/userModel.js";
import mongoose from "mongoose";

dotenv.config();

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@example.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Admin@12345";

const run = async () => {
  await connectDB();

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, salt);

  const existing = await User.findOne({ email: ADMIN_EMAIL });
  if (existing) {
    existing.username = ADMIN_USERNAME;
    existing.password = hashedPassword;
    existing.isAdmin = true;
    await existing.save();
    console.log(`Updated existing admin: ${ADMIN_EMAIL}`);
  } else {
    await User.create({
      username: ADMIN_USERNAME,
      email: ADMIN_EMAIL,
      password: hashedPassword,
      isAdmin: true,
    });
    console.log(`Created admin: ${ADMIN_EMAIL}`);
  }

  console.log(`  email:    ${ADMIN_EMAIL}`);
  console.log(`  password: ${ADMIN_PASSWORD}`);

  await mongoose.connection.close();
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
