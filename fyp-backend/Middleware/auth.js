/** @format */

import jwt from "jsonwebtoken";
import User from "../models/User.js";
import httpError from "../util/http-error.js";

export const authenticate = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        const error = new httpError("Not Authorized,no token", 401);
        next(error);
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (er) {
      console.log("Error", er);
      const error = new httpError("Internal server error", 401);
      next(error);
    }
  }
};
