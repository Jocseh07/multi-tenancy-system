import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest, TokenPayload } from "../../types/types";
import { catchAsyncError } from "../../utils/catchAsyncError";
import { UserRole } from "@prisma/client";
import { AppError } from "../../utils/appError";

export const authenticateUser = catchAsyncError<AuthRequest, Response>(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer")) {
      next(new AppError("Unauthorized: No token provided", 401));
      return;
    }

    const tokenString = token.split(" ")[1];

    if (!tokenString) {
      next(new AppError("Unauthorized: No token provided", 401));
      return;
    }

    const decoded = jwt.verify(
      tokenString,
      process.env.JWT_SECRET!
    ) as TokenPayload;

    // Attach user info to the request object
    req.user = decoded;
    next();
  }
);

// Middleware for role-based authorization
export const authorizeRoles = (allowedRoles: UserRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(403).json({ message: "Access denied" });
      return;
    }

    if (req.user.status !== "APPROVED") {
      res.status(403).json({ message: "User is not approved" });
      return;
    }

    if (req.user.role && !allowedRoles.includes(req.user.role)) {
      res.status(403).json({ message: "Insufficient permissions" });
      return;
    }

    next();
  };
};
