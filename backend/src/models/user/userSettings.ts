import mongoose, { model, Schema, Types } from "mongoose";

const userSettingsSchema = new Schema<IUserSettings>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    theme: {
      type: Boolean,
      default: false,
    },
    activeFlag: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "user_settings", timestamps: true }
);

interface IUserSettings {
  theme: boolean;
  isVerified: boolean;
  activeFlag: boolean;
  user_id: Types.ObjectId;
}

const UserSettings = model<IUserSettings>("user_settings", userSettingsSchema);

export { UserSettings };
