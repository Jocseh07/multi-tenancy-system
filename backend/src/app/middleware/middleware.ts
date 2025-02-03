import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest, TokenPayload } from "../../types/types";
import { catchAsyncError } from "../../utils/catchAsyncError";
import { UserRole } from "@prisma/client";

export const authenticateUser = catchAsyncError<AuthRequest, Response>(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer")) {
      res.status(401).json({ message: "Unauthorized: No token provided" });
      return;
    }

    const tokenString = token.split(" ")[1];

    if (!tokenString) {
      res.status(401).json({ message: "Unauthorized: No token provided" });
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
