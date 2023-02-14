import { IUser } from "../../models/user/user";

// to make the file a module and avoid the TypeScript error
export {};

declare global {
  namespace Express {
    export interface Request {
      user: IUser;
      token: string;
    }
  }
}
