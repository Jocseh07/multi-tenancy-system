import { UserStatus, User, UserRole } from "@prisma/client";
import { Request } from "express";

export interface AuthRequest extends Request {
  user?: TokenPayload;
}

export interface TokenPayload {
  userId: string;
  role?: UserRole;
  tenantId?: string;
  status: UserStatus;
}
