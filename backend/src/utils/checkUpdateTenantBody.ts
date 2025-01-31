import { Request, Response, NextFunction } from "express";
import { UpdateTenantBody } from "../types/types";

export const checkUpdateTenantBody = (
  req: Request<{}, {}, UpdateTenantBody>,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.name && !req.body.email) {
    res.status(400).json({ message: "Body is required" });
    return;
  }
  next();
};
