import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Session } from "express-session";

interface MySessionData {
  [key: string]: any;
}

interface MySession extends Session {
  jwt?: string; // add jwt property
  data?: MySessionData;
}
interface UserPayload {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!(req.session as any).jwt) {
    return next();
  }

  try {
    const payload = jwt.verify((req.session as any).jwt, "asdf") as UserPayload;
    req.currentUser = payload;
  } catch (err) {}

  next();
};
