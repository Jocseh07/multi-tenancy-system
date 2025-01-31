import { NextFunction, Request, Response } from "express";
import { CreateTenantBody } from "../types/types";

export const checkCreateTenantBody = (
  req: Request<{}, {}, CreateTenantBody>,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.name || !req.body.email) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }
  next();
};
