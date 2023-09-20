import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
const app = express();
import express from "express";
import morgan from "morgan";
import jobsRouter from "./routes/jobRouter.js";
import mongoose from "mongoose";
import erroHandlerMiddleware from "./middleware/erroHandlerMiddleware.js";
import userRouter from "./routes/userRouter.js";
import { auth } from "./middleware/authMiddleware.js";
import cookieParser from "cookie-parser";
import usersRouter from "./routes/usersRouter.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import cloudinary from "cloudinary";
if (process.env.NODE_ENV) {
  app.use(morgan("dev"));
}
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, "./public")));

//meu deus da pra faze fetch aqui do backend
// try {
//   const res = await fetch("http://localhost:8000/api/v1/fretes/todos");
//   const frete = await res.json();
//   console.log(frete);
// } catch (error) {
//   console.log(error);
// }
app.use(cookieParser());
app.use(express.json());
app.get("/", function (req, res) {
  res.send("Hello wolrd");
});

app.use("/api/v1/jobs", auth, jobsRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/users-new", auth, usersRouter);
//erro que cobre todas as rotas erradas, esse é melhor que aquele html bizarro que o express da
app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public", "index.html"));
});
app.use(erroHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URI);
  app.listen(port, () => {
    console.log(`on ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
