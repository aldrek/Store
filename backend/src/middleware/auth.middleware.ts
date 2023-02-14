import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IUser, User } from "../models/user/user";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Fetch headers

  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    const user = jwt.verify(
      token ?? "",
      process.env.TOKEN_SECRET ?? ""
    ) as IUser;

    // check if access_token exit in user's tokens
    const userId = user._id;

    const authUser = await User.findOne({ _id: userId, "tokens.token": token });

    if (authUser) {
      req.user = authUser;
      req.token = token ?? "";

      next();
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized access!" });
    }
  } catch {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized access!" });
  }
}
