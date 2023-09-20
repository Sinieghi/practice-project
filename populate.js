import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import User from "./models/user.js";
import { readFile } from "fs/promises";
import Job from "./models/Job.js";

try {
  console.log(process.env.MONGO_URI);
  await mongoose.connect(process.env.MONGO_URI);
  const user = await User.findOne({ email: "test@test.com" });
  const jsonJobs = JSON.parse(
    await readFile(new URL("./utils/MOCK_DATA_JOBS.json", import.meta.url))
  );
  const jobs = jsonJobs.map((job) => {
    return { ...job, createdBy: user._id };
  });
  await Job.deleteMany({ createdBy: user._id });
  await Job.create(jobs);
  console.log("success");
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}