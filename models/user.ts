import { Schema, model } from "mongoose";
import { IUser } from "../types/index";

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = model<IUser>("user", UserSchema);

export { User };
