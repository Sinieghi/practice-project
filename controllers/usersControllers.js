import { StatusCodes } from "http-status-codes";
import User from "../models/user.js";
import Job from "../models/Job.js";
import cloudinary from "cloudinary";
import { promises as fs } from "fs";
//para remover o local storage é só colocar esse cara aqui
export const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user.userId);
  const userWhitoutPass = user.toJSON(); // pra tirar a senha, igula .select('-pass')
  res.status(StatusCodes.OK).json({ user: userWhitoutPass });
};
export const getAplication = async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  res.status(StatusCodes.OK).json({ msg: "apli user" });
};
export const updatteUser = async (req, res) => {
  const newUser = { ...req.body };
  delete newUser.password;
  if (req.file) {
    const response = await cloudinary.v2.uploader.upload(req.file.path);
    //isso apaga o storage da image, local no caso...
    await fs.unlink(req.file.file);
    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
  }
  //ele vai sem o new:true aqui para manter a instância antiga, ou seja, para pegar a imagem anterior caso tenha e deletar
  const upUser = await User.findByIdAndUpdate(req.user.userId, newUser);
  //e aqui caso tenho uma instancia de imagem antiga na cloudnary, ja deleta.
  if (req.file && upUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(upUser.avatarPublicId);
  }
  res.status(StatusCodes.OK).json({ msg: "up user" });
};
