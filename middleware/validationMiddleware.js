import { body, param, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../ERRORS/customErrors.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constantes.js";
import mongoose from "mongoose";
import Job from "../models/Job.js";
import User from "../models/user.js";

const withvalidationError = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        //esse cara ta checando se o erro é falta de tal id no DB
        if (errorMessages[0].startsWith("no job")) {
          throw new Error(errorMessages);
        }
        if (errorMessages[0].startsWith("Not authorize")) {
          throw new Error(errorMessages);
        }
        throw new Error(errorMessages);
      }

      next();
    },
  ];
};

export const validateJobInput = withvalidationError([
  body("company").notEmpty().withMessage("company is required"),
  body("position").notEmpty().withMessage("position is required"),
  body("jobLocation").notEmpty().withMessage("job location is required"),
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("invalid status value"),
  body("jobType")
    .isIn(Object.values(JOB_TYPE))
    .withMessage("invalid type value"),
]);

export const validateInParam = withvalidationError([
  //esse cara é um validate de id
  param("id").custom(async (val, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(val);
    if (!isValidId) throw new BadRequestError("invalide id");
    const job = await Job.findById(val);
    if (!job) {
      throw new NotFoundError("Not found that id");
    }
    console.log(req.user.role);
    const isAdmin = req.user.role === "admin";
    const isOwner = req.user.userId === job.createdBy.toString();
    if (!isAdmin && !isOwner) {
      throw new UnauthorizedError("Not authorize to access");
    }
  }),
]);

export const validateRegisterErrors = withvalidationError([
  body("name").notEmpty().withMessage("Need name value"),
  body("lastName").notEmpty().withMessage("Need Last name value"),
  body("email")
    .notEmpty()
    .withMessage("Need email value")
    .isEmail()
    .withMessage("not valid format")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError("Email already existe");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("Need password value")
    .isLength({ min: 6 })
    .withMessage("min character 6"),
  body("location").notEmpty().withMessage("Need location value"),
]);

export const validateLoginErrors = withvalidationError([
  body("email")
    .notEmpty()
    .withMessage("Need email value")
    .isEmail()
    .withMessage("not valid format"),
  body("password")
    .notEmpty()
    .withMessage("Need password value")
    .notEmpty()
    .withMessage("Need location value"),
]);

export const validateUserUp = withvalidationError([
  body("name").notEmpty().withMessage("Need name value"),
  body("lastName").notEmpty().withMessage("Need Last name value"),
  body("email")
    .notEmpty()
    .withMessage("Need email value")
    .isEmail()
    .withMessage("not valid format")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new BadRequestError("Email already existe");
      }
    }),
  body("location").notEmpty().withMessage("Need location value"),
]);
