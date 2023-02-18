import { NextFunction } from "express";
import Logging from "../library/Logging";
import { Request, Response } from "express";

export const initLogger = (app: any) => {
  /** Log the request */
  app.use((req: Request, res: Response, next: NextFunction) => {
    /** Log the req */
    Logging.info(
      `Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    );

    res.on("finish", () => {
      /** Log the res */
      Logging.info(
        `Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`
      );
    });

    next();
  });
};
