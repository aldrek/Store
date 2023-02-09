import mongoose, { model, Schema } from "mongoose";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
    },
  },
  { collection: "User" }
);

const User = model<IUser>("User", userSchema);

export { User };

// User module
interface IUser {
  name: String;
}
