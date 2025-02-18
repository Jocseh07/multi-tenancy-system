import { Request, Response } from "express";
import { catchAsyncError } from "../../../utils/catchAsyncError";
import { AppError } from "../../../utils/appError";
import bcrypt from "bcryptjs";
import { User } from "@prisma/client";
import { createSendToken } from "./createSendToken";
import { prisma } from "../../../../server";
import { AuthResponseBody } from "../../../types/types";
type LoginBody = Pick<User, "email" | "password">;

export const login = catchAsyncError<
  Request<{}, {}, LoginBody>,
  Response<AuthResponseBody>
>(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new AppError("Invalid Email or Password", 400));
    return;
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    next(new AppError("User not found", 404));
    return;
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  console.log(isPasswordCorrect);

  if (!isPasswordCorrect) {
    next(new AppError("Invalid Email or Password", 401));
    return;
  }

  // if (user.status !== "APPROVED") {
  //   next(new AppError("User is not approved", 401));
  //   return;
  // }

  createSendToken(user, 200, res);
});
