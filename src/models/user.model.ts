// src/models/user.model.ts
import { Schema, models, model, Types } from "mongoose";

// Allowed roles list — notun role add korte hole shudhu ekhane push korun
export const USER_ROLES = ["user", "admin"] as const;
export type UserRole = (typeof USER_ROLES)[number];

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password?: string; // credentials login-er jonno, select: false — default query-te ashbe na
  image?: string;
  provider: "credentials" | "google";
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, select: false },
    image: { type: String },
    provider: {
      type: String,
      enum: ["credentials", "google"],
      default: "credentials",
    },
    // default "user" — tai Google diye notun account create hoile
    // explicit role na dileo DB-te "user" boshe jabe
    role: { type: String, enum: USER_ROLES, default: "user" },
  },
  { timestamps: true },
);

// Hot-reload/Next.js dev mode-e model re-compile error avoid korte
// existing model thakle shei ta reuse kora hocche
const User = models.User || model<IUser>("User", UserSchema);
export default User;
