import { Request } from "express";

export interface CustomRequest extends Request {
    user?: any,
}

export interface IUser {
    name: string;
    email: string;
    password: string;
  }