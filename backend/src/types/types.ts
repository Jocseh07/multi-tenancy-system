import { UserStatus, UserRole } from "@prisma/client";
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

type ResponseData = {
  id: string;
  name: string;
  email: string;
  role: UserRole | null;
  tenantId: string | null;
  status: UserStatus;
};

export type AuthResponseBody = {
  data: ResponseData;
  // token: string;
  // status: "success";
};
