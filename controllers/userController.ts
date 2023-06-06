import { Request, Response } from "express";
import { User } from "../models/user";
import emailValidator from "email-validator";
import jwt, { Secret } from "jsonwebtoken";
import { CustomRequest } from "../types/index";

// const JWT_SECRET = process.env.JWT_SECRET ;

class UserController {
  static async createUser(req: Request, res: Response) {
    let { name, email, password } = req.body;
    if (!(name && email && password)) {
      return res.json({ status: "FAILED", message: "All fields are required" });
    }

    name = name.trim();
    email = email.trim();
    password = password.trim();

    // validate name
    if (name.length < 3) {
      return res.json({ status: "FAILED", message: "Name must contain atleast 3 characters." });
    }
    if (name.length > 30) {
      return res.json({ status: "FAILED", message: "Name must contain atmost 30 characters." });
    }

    // validate email
    if (!emailValidator.validate(email)) {
      return res.json({ status: "FAILED", message: "Invalid email address" });
    }

    // validate password
    if (password.length < 6) {
      return res.json({ status: "FAILED", message: "Password must contain atleast 6 characters." });
    }
    if (password.length > 20) {
      return res.json({ status: "FAILED", message: "Password must contain atmost 20 characters." });
    }

    // All fields are valid, create user
    try {
      const isExists = await User.exists({ email: email });
      if (isExists) {
        return res.json({ status: "FAILED", message: "Already have account with this email." });
      } else {
        const userDoc = new User({ name, email, password });
        await userDoc.save();
        const token = jwt.sign({ userId: userDoc._id.toString() }, process.env.JWT_SECRET as Secret, {
          expiresIn: "3 days",
        });
        res.json({ status: "SUCCESS", message: "New user created successfully.", data: { token } });
      }
    } catch (err) {
      res.json({ status: "FAILED", message: "Unable to create new user", error: err });
    }
  }

  static async loginUser(req: Request, res: Response) {
    let { email, password } = req.body;

    if (!(email && password)) {
      return res.json({ status: "FAILED", message: "All fields are required" });
    }

    email = email.trim();
    password = password.trim();

    // validate email
    if (!emailValidator.validate(email)) {
      return res.json({ status: "FAILED", message: "Invalid email address" });
    }

    // validate password
    if (password.length < 6) {
      return res.json({ status: "FAILED", message: "Password must contain atleast 6 characters." });
    }
    if (password.length > 20) {
      return res.json({ status: "FAILED", message: "Password must contain atmost 20 characters." });
    }

    try {
      const user = await User.findOne({ email, password })
      if (!user) {
        return res.json({ status: "FAILED", message: "Email or Password incorrect" });
      }

      const token = jwt.sign({ userId: user._id.toString() }, process.env.JWT_SECRET as Secret, {
        expiresIn: "3 days",
      });
      res.json({ status: "SUCCESS", message: "get user", data: { token } });
    }
    catch (err) {
      return res.json({ status: "FAILED", message: "Unable to login" });
    }
  }

  static async getUser(req: CustomRequest, res: Response) {
    const user = req.user;
    res.json({ status: "SUCCESS", message: "get user", data: { user } });
  }

  static async updateUser(req: Request, res: Response) {
    res.json({ status: "SUCCESS", message: "update user", data: "user" });
  }

  static async deleteUser(req: CustomRequest, res: Response) {
    try {
      const result = await User.deleteOne({ _id: req.user._id })
      res.json({ status: "SUCCESS", message: "user deleted successfully" });
    }
    catch (err) {
      res.json({ status: "FAILED", message: "unable to delete user" });
    }
  }

}

export { UserController };
