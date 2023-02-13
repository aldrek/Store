import { Request, Response } from "express";
import { IUser, User } from "../models/user/user";
import { UserSettings } from "../models/user/userSettings";
import { responseWithMessage } from "../util/responseUtil";

// -------------------------------------------------------------------------------------------
// Main goal: Signup User with email and password
// -------------------------------------------------------------------------------------------
export const signupUser = async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);

    const isEmailExist = await User.findOne({ email: user.email });

    if (isEmailExist) res.status(400).send({ error: "User already exist" });
    else {
      await user.hashPassword(user.password);

      await user.save();
      await new UserSettings({
        user_id: user._id,
      }).save();

      if (user) {
        responseWithMessage(res, user);
      } else {
        res.status(400).send({ error: "Something wrong happends" });
      }
    }
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
};

// -------------------------------------------------------------------------------------------
// Main goal: Signin user with email and password
// -------------------------------------------------------------------------------------------
export const signinUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    var user = await User.findOne({ email: email });

    if (!user?.email) {
      return res.status(400).json({ error: "User not exist" });
    } else {
      const userSettings = await UserSettings.findOne({ user_id: user._id });
      if (!userSettings || !userSettings.activeFlag) {
        res.status(400).send({ error: "Something wrong happends" });
      } else {
        // Compare password
        const check = user.checkPassword(password);

        if (check) {
          // Generate token
          res.status(200).send({ data: user });
        } else {
          res.status(400).send({ error: "Wrong password" });
        }
      }
    }
  } catch (e) {
    console.log(e);
    res.status(400).send({ error: "Something wrong happends" });
  }
};

export const fetchUserInfo = async (req: Request, res: Response) => {
  res.send("fetchUserInfo");
};

export const signOutUser = async (req: Request, res: Response) => {
  res.send("signOutUser");
};

export const editUser = async (req: Request, res: Response) => {
  res.send("editUser");
};

export const deleteUser = async (req: Request, res: Response) => {
  res.send("deleteUser");
};

export const adminEditUser = async (req: Request, res: Response) => {
  res.send("adminEditUser");
};

export const adminDeleteUser = async (req: Request, res: Response) => {
  res.send("adminDeleteUser");
};

export const fetchAllUsers = async (req: Request, res: Response) => {
  res.send("fetchUsers");
};
