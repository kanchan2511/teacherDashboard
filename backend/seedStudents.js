const mongoose = require("mongoose");
require("dotenv").config();

const Student = require("./models/Student");

const connectDB = require("./config/db");

const students = Array.from({ length: 20 }, (_, i) => ({
  name: `Student ${i + 1}`,
  class: String(5 + Math.floor(i / 4)),   // distributes classes
  section: i % 2 === 0 ? "A" : "B",
  studentId: `STU${String(i + 1).padStart(3, "0")}`,
}));

const seed = async () => {
  try {
    await connectDB();

    // optional: clear old students first
    await Student.deleteMany();

    await Student.insertMany(students);

    console.log("✅ 20 students inserted successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
