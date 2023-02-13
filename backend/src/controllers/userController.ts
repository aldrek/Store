import { Request, Response } from "express";
import { User } from "../models/user/user";
import Joi from "joi";

//
// Main goal: Sign up User
// -------------------------------------------------------------------------------------------
export const signupUser = async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);

    const isEmailExist = await User.findOne({ email: user.email });

    if (isEmailExist) res.status(400).send({ error: "User already exist" });
    else {
      await user.hashPassword(user.password);

      await user.save();

      if (user) {
        res.send({
          status: "Success ",
          user: user,
        });
      } else {
        res.status(400).send({ error: "Something wrong happends" });
      }
    }
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
};

export const signinUser = async (req: Request, res: Response) => {
  res.send("User controller");
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
