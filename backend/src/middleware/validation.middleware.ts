import { Request, Response, NextFunction } from "express";
import Joi, { ObjectSchema } from "joi";
import Logging from "../library/Logging";
import { IUser } from "../models/user/user";

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

export const validationSchema = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      Logging.error(error);
      return res.status(400).json({});
    }
  };
};

export const Schemas = {
  user: {
    create: Joi.object<IUser>({
      fullname: Joi.string().required(),
    }),
    update: Joi.object<IUser>({
      password: Joi.string().required(),
    }),
  },
};
