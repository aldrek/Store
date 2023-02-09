import { Request, Response } from "express";

export const fetchUserData = async (req: Request, res: Response) => {
  res.send("User controller");
};
