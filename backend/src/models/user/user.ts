import mongoose, { model, Schema } from "mongoose";
import { userTypes } from "../types";
import validator from "validator";
const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, "A name is required."],
      lowercase: true,
      trim: true,
      maxlength: 100,
      unique: true,
      validate: {
        validator: (value: any) => {
          return validator.isEmail(value);
        },
        message: "Invalid email format",
      },
    },
    password: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      lowercase: true,
      trim: true,
      maxlength: 100,
    },
    image: { type: String, lowercase: true, trim: true, maxlength: 100 },
    role: {
      type: String,
      default: userTypes.customer,
      enum: Object.values(userTypes),
    },
  },
  { collection: "user", timestamps: true }
);

const User = model<IUser>("user", userSchema);

export { User };

// User module
interface IUser {
  email: String;
  password: String;
  fullname: String;
  image: String;
  role: String;
}
