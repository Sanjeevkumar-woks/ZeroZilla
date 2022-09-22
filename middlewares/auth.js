// Auth middleware
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const auth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.send({ err: err.message });
  }
};
