import { Response } from "express";
import { signToken } from "./signToken";
import { User } from "@prisma/client";
import { AuthResponseBody } from "../../../types/types";

export const createSendToken = (
  user: User,
  statusCode: number,
  res: Response<AuthResponseBody>
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
  const userId = user.id.toString();
  const requiredData = {
    id: userId,
    name: user.name,
    email: user.email,
    role: user.role,
    tenantId: user.tenantId,
    status: user.status,
  };
  res.status(statusCode).json({
    data: requiredData,
    // token,
    // status: "success",
  });
};
