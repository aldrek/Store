import mongoose, { Model, model, Schema, Types } from "mongoose";
import { deleteType } from "../../util/userUtil";
import { IUser } from "./user";
import { Request, Response } from "express";

interface IUserSettings {
  theme: String;
  isVerified: boolean;
  activeFlag: boolean;
  deactivatedFlag: boolean;
  user_id: Types.ObjectId;
}

const userSettingsSchema = new Schema<IUserSettings, UserSettingsModel>(
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
    deactivatedFlag: {
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

// --------------------------
// Methods
// --------------------------

userSettingsSchema.statics.changeUserActivationStatus =
  async function changeUserActivationStatus(type, req, res) {
    try {
      if (type === deleteType.deactivate) {
        await UserSettings.findOneAndUpdate(
          { user_id: req.user._id },
          { deactivatedFlag: true }
        );
        res.status(200).send({ status: "Success" });
      } else if (type === deleteType.delete) {
        await UserSettings.findOneAndUpdate(
          { id: req.user._id },
          { activeFlag: false }
        );
        res.status(200).send({ status: "Success" });
      } else {
        res.status(400).send({ status: "Failed" });
      }
    } catch {
      res.status(400).send({ status: "Failed" });
    }
  };

// Create a new Model type that knows about IUserMethods...
interface UserSettingsModel extends Model<IUserSettings> {
  changeUserActivationStatus(
    type: String,
    req: Request,
    res: Response
  ): boolean;
}

const UserSettings = model<IUserSettings, UserSettingsModel>(
  "user_settings",
  userSettingsSchema
);

export { UserSettings };
