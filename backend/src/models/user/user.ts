import mongoose, { Model, model, Schema, Types } from "mongoose";
import { userTypes } from "../types";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    refresh_tokens: [
      {
        refresh_token: {
          type: String,
          required: true,
        },
      },
    ],
    access_token: {
      type: String,
      default: "",
    },
    refresh_token: {
      type: String,
      default: "",
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

userSchema.method("logout", async function logout() {
  try {
    const user = this;

    let tokens = user.tokens.filter((token: any) => {
      return token.token !== user.access_token;
    });

    console.log("asd", tokens);
    user.tokens = tokens;
    user.save();
  } catch (e) {
    console.log(e);
  }
});

userSchema.method("generateAuthToken", async function generateAuthToken() {
  try {
    let user = this;

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET + "", {
      expiresIn: process.env.TOKEN_LIFE + "",
    });

    const refreshToken = jwt.sign(
      { _id: user._id },
      process.env.REFRESH_TOKEN_SECRET + "",
      { expiresIn: process.env.REFRESH_TOKEN_LIFE + "" }
    );

    user.tokens = user.tokens.concat({ token: token });
    user.refresh_tokens = user.refresh_tokens.concat({
      refresh_token: refreshToken,
    });

    await user.save();

    user.access_token = token;
    user.refresh_token = refreshToken;
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
  logout(): void;
  hashPassword(password: String): String;
  checkPassword(password: String): String;
  generateAuthToken(): void;
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
  tokens: [];
  refresh_tokens: [];
  access_token: String;
  refresh_token: String;
}

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.id;
    delete ret.password;
    delete ret.tokens;
    delete ret.refresh_tokens;
    delete ret.__v;
  },
});
