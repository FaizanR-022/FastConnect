import { verifyToken } from "../utils/jwtHelper.js";
import { AppError } from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/index.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  console.log("Reaching here");

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new AppError("Not authorized, no token", 401);
  }

  const decoded = verifyToken(token);

  const user = await User.findOne({ where: { public_id: decoded.userId } });

  if (!user) {
    throw new AppError("User no longer exists", 401);
  }

  req.user = user;
  next();
});
