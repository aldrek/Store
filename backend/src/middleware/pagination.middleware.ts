import { Request, Response, NextFunction } from "express";

const pagination = (req: Request, res: Response, next: NextFunction) => {
  const pageAsNumber = Number.parseInt(req.page);
  const sizeAsNumber = Number.parseInt(req.size);

  let page = 0;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    page = pageAsNumber;
  }

  let size = 10;
  if (
    !Number.isNaN(sizeAsNumber) &&
    !(sizeAsNumber > 10) &&
    !(sizeAsNumber < 1)
  ) {
    size = sizeAsNumber;
  }
  req.page = page;
  req.size = size;

  next();
};
