import { NextFunction, Response } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { User } from "../models/user";
import { CustomRequest } from "../types/index";


async function auth(req: CustomRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!(authHeader && authHeader.startsWith("Bearer "))) {
    return res.json({ status: "FAILED", message: "Invalid token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as Secret);
    const userId = (decoded as JwtPayload).userId;
    const user = await User.findOne({ _id: userId });
    if (user === null) {
      return res.json({ status: "FAILED", message: "User not exists"});
    }
    req.user = user;
    return next();
  } catch (err) {
    return res.json({ status: "FAILED", message: "Invalid token", error: err });
  }
}

export { auth };
