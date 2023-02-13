import { Response } from "express";

export const responseWithMessage = <T>(res: Response, obj: T) => {
  res.send({
    status: "success",
    data: obj,
  });
};
