import mongoose, { Schema, models, model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

// Hot-reload এ model re-compile error আটকানোর জন্য এভাবে export করা হয়
const User = models.User || model<IUser>("User", UserSchema);

export default User;
