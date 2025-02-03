import { Response } from "express";
import { signToken } from "./signToken";
import { User } from "@prisma/client";

export const createSendToken = (
  user: User,
  statusCode: number,
  res: Response
) => {
  const token = signToken({
    userId: user.id,
    role: user.role ?? undefined,
    tenantId: user.tenantId ?? undefined,
    status: user.status,
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    secure: process.env.NODE_ENV === "production",
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });
  res.status(statusCode).json({
    data: user,
    token,
    status: "success",
  });
};
