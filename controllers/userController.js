import { StatusCodes } from "http-status-codes";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { comparePasword, hashPassword } from "../utils/passwordHash.js";
import { UnauthenticatedError } from "../ERRORS/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";
const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user";
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;
  await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "success!" });
};
const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const isValid =
    user && (await comparePasword(req.body.password, user.password));
  if (!isValid) throw new UnauthenticatedError("invalide credentilas");
  const token = createJWT({ userId: user._id, role: user.role });
  const day = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + day),
    secure: process.env.NODE_ENV === "production",
  });
  res.status(StatusCodes.CREATED).json({ msg: "success!" });
};

const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  const user = User;
  res.status(StatusCodes.OK).json({ msg: "loginout" });
};

export { register, login, logout };
