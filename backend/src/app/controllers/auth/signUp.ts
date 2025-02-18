import { Request, Response } from "express";
import { catchAsyncError } from "../../../utils/catchAsyncError";
import { prisma } from "../../../../server";
import { type User } from "@prisma/client";
import { AppError } from "../../../utils/appError";
import { createSendToken } from "./createSendToken";
import bcrypt from "bcryptjs";
import { AuthResponseBody } from "../../../types/types";
type CreateUserBody = Pick<User, "name" | "email" | "password">;

export const signUp = catchAsyncError<
  Request<{}, {}, CreateUserBody>,
  Response<AuthResponseBody>
>(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    next(new AppError("Missing required fields", 400));
    return;
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });

  if (existingUser) {
    next(new AppError("User already exists", 400));
    return;
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 12);

  const newUser = await prisma.user.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    },
  });

  if (!newUser) {
    next(new AppError("Failed to create user", 500));
    return;
  }

  createSendToken(newUser, 201, res);
});
