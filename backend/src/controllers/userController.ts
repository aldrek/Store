import { Request, Response } from "express";

export const fetchUserData = async (req: Request, res: Response) => {
  res.send("User controller");
};

export const registerUser = async (req: Request, res: Response) => {
  res.send("Register");
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

export const fetchUserInfo = async (req: Request, res: Response) => {
  res.send("fetchUserInfo");
};
