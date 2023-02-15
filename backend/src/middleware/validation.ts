import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const checkPassword = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password } = req.body;

  const mySchema = Joi.string().min(2).max(30).required();

  const { error } = mySchema.validate(password);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  } else {
    next();
  }
};
