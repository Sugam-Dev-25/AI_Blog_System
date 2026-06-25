require("dotenv").config();

const mongoose = require("mongoose");
const User = require("./app/models/User");
const bcrypt = require("bcryptjs");

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    const adminExists = await User.findOne({ email: "rimpa@gmail.com" });
    if (adminExists) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("123456", 10);
    const admin = await User.create({
      name: "Rimpa",
      email: "rimpa@gmail.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin created successfully:", admin);

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

seedAdmin();
