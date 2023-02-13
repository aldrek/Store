import mongoose, { model, Schema, Types } from "mongoose";

const userSettingsSchema = new Schema<IUserSettings>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    theme: {
      type: String,
      default: "light",
    },
    activeFlag: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "user_settings", timestamps: true }
);

interface IUserSettings {
  theme: String;
  isVerified: boolean;
  activeFlag: boolean;
  user_id: Types.ObjectId;
}

const UserSettings = model<IUserSettings>("user_settings", userSettingsSchema);

export { UserSettings };
