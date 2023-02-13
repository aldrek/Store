import { Request, Response, NextFunction } from "express";

export const apiAuth = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers.api_key;
  if (process.env.API_KEY !== apiKey) {
    res.send({
      message: "You are not allowed to use this api",
    });
  } else {
    next();
  }
};
