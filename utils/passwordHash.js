import bcrypt from "bcryptjs";

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const comparePasword = async (password, hashedPassword) => {
  const isMacth = await bcrypt.compare(password, hashedPassword);
  return isMacth;
};
