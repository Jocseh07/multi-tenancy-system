import { NextFunction, Request, Response } from "express";

export const catchAsyncError = <T extends Request, R extends Response>(
  fn: (req: T, res: R, next: NextFunction) => Promise<void>
) => {
  return (req: T, res: R, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};
