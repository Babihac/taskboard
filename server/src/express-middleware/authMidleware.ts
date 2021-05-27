import { Request, Response, NextFunction } from "express";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session.userid) {
    next();
  } else {
    next(new Error("User is not logged in"));
  }
};
