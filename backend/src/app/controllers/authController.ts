import { NextFunction } from "express";
import { prisma } from "../../../server";
import { Request, Response } from "express";
import { catchAsyncError } from "../../utils/catchAsyncError";
import {
  CreateUserBody,
  LoginBody,
  User,
  UserResponse,
} from "../../types/types";
import { AppError } from "../../utils/appError";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { signToken } from "../../utils/signToken";
import { createSendToken } from "../../utils/createSendToken";
export const signUp = catchAsyncError<
  Request<{}, {}, CreateUserBody>,
  Response<UserResponse>
>(
  async (
    req: Request<{}, {}, CreateUserBody>,
    res: Response<UserResponse>,
    next: NextFunction
  ) => {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (user) {
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
  }
);

export const getAllUsers = catchAsyncError<Request, Response<User[]>>(
  async (req: Request, res: Response<User[]>, next: NextFunction) => {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  }
);

export const login = catchAsyncError<
  Request<{}, {}, LoginBody>,
  Response<UserResponse>
>(
  async (
    req: Request<{}, {}, LoginBody>,
    res: Response<UserResponse>,
    next: NextFunction
  ) => {
    const { email, password } = req.body;
    if (!email || !password) {
      next(new AppError("Invalid Email or Password", 400));
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      next(new AppError("User not found", 404));
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) {
      next(new AppError("Invalid Email or Password", 401));
      return;
    }

    createSendToken(user, 200, res);
  }
);

type ModifiedRequest = Request & { userId?: string };

export const protect = catchAsyncError<ModifiedRequest, Response>(
  async (req: ModifiedRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token || !token.startsWith("Bearer")) {
      next(new AppError("Unauthorized", 401));
      return;
    }

    const tokenString = token.split(" ")[1];

    const decoded = jwt.verify(tokenString, process.env.JWT_SECRET as string);
    if (!decoded) {
      next(new AppError("Unauthorized", 401));
      return;
    }

    const userId = (decoded as { id: string }).id;
    if (!userId) {
      next(new AppError("Unauthorized", 401));
      return;
    }

    req.userId = userId;

    next();
  }
);
