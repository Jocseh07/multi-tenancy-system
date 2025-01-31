import { NextFunction, Request, Response } from "express";
import { TenantParams } from "../types/types";

export const checkTenantId = (
  req: Request<TenantParams>,
  res: Response,
  next: NextFunction
) => {
  if (!req.params.tenantId || req.params.tenantId.length !== 24) {
    res.status(400).json({
      message:
        "Tenant ID must be provided as a hex string representation of 12 bytes",
    });
    return;
  }
  next();
};
