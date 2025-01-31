import { Response } from "express";
import { User } from "../types/types";
import { signToken } from "./signToken";

export const createSendToken = (
  user: User,
  statusCode: number,
  res: Response
) => {
  const token = signToken(user.userId);
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
