import mongoose, { Model, model, Schema, Types } from "mongoose";
import { userTypes } from "../types";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
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
      min: [3, "Password more than three characters"],
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
  {
    collection: "user",
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.method("hashPassword", async function hashPassword(password) {
  try {
    var salt: any = await bcrypt.genSalt(10);
    this.password = bcrypt.hashSync(password, salt);
  } catch (e) {
    console.log(e);
  }
});

userSchema.method("checkPassword", function checkPassword(password) {
  try {
    const userPassword = this.password;

    return bcrypt.compareSync(password, userPassword);
  } catch (e) {
    console.log(e);
    return false;
  }
});

const User = model<IUser, UserModel>("user", userSchema);

// Put all user instance methods in this interface:
interface IUserMethods {
  hashPassword(password: String): String;
  checkPassword(password: String): String;
}

// Create a new Model type that knows about IUserMethods...
type UserModel = Model<IUser, {}, IUserMethods>;

export { User };

// User module
export interface IUser {
  _id: Types.ObjectId;
  email: String;
  password: String;
  fullname: String;
  image: String;
  role: String;
}

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.id;
    delete ret.password;
    delete ret.__v;
  },
});
