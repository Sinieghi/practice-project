import {
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
} from "../ERRORS/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const auth = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("Not authorized");
  try {
    const { userId, role } = verifyJWT(token);
    const testUser = userId === "64e7b489f3efc970bc9240ad";
    req.user = { userId, role, testUser };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Not authorized");
  }
};

export const authPermissions = (...roles) => {
  return (req, res, next) => {
    console.log(roles.includes(req.user.role));
    if (!roles.includes(req.user.role)) {
      console.log(roles);
      throw new UnauthorizedError("unauthorized");
    }
    next();
  };
};

export const checkForTestUser = (req, res, next) => {
  if (req.user.testUser) throw new BadRequestError("Demo user only");
  next();
};
