import { IUser, User } from "../models/user/user";
import { UserSettings } from "../models/user/userSettings";
import { responseWithMessage } from "../util/responseUtil";
import * as dotenv from "dotenv";
import { deleteType } from "../util/userUtil";
import { Request, Response } from "express";

// -------------------------------------------------------------------------------------------
// Main goal: Signup User with email and passwordh
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
// Main goal: Signin user using email and password
// -------------------------------------------------------------------------------------------
export const signinUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    var user = await User.findOne({ email: email });

    if (!user?.email) {
      return res.status(400).json({ error: "User not exist" });
    } else {
      const userSettings = await UserSettings.findOne({ user_id: user._id });
      if (
        !userSettings ||
        !userSettings.activeFlag ||
        userSettings.deactivatedFlag
      ) {
        res.status(400).send({ error: "Something wrong happends" });
      } else {
        // Compare password
        const check = user.checkPassword(password);

        if (check) {
          // Generate token
          await user.generateAuthToken();
          res.status(200).send({ data: user });
        } else {
          res.status(400).send({ error: "Wrong password" });
        }
      }
    }
  } catch (e) {
    console.log(e);
    res.status(400).send({ error: e });
  }
};

// -------------------------------------------------------------------------------------------
// Main goal: Return user information
// -------------------------------------------------------------------------------------------
export const fetchUserInfo = async (req: Request, res: Response) => {
  req.user.access_token = req.token;
  res.send({
    status: "success",
    data: req.user,
  });
};

// -------------------------------------------------------------------------------------------
// Main goal: Sign out user by deleting thier current access-token
// -------------------------------------------------------------------------------------------
export const signOutUser = async (req: Request, res: Response) => {
  try {
    req.user.access_token = req.token;
    let user = req.user;
    user.logout();

    res.json({
      status: "true",
      message: "Logout completed",
    });
  } catch (e) {
    res.send({
      status: false,
    });
  }
};

// -------------------------------------------------------------------------------------------
// Main goal: Delete user as soft delete
// -------------------------------------------------------------------------------------------
export const deleteUser = async (req: Request, res: Response) => {
  const { type } = req.body;

  UserSettings.changeUserActivationStatus(type, req, res);
};

export const editUser = async (req: Request, res: Response) => {
  res.send("editUser");
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
