import { Request, Response } from "express";
import { catchAsyncError } from "../../../utils/catchAsyncError";
import { prisma } from "../../../../server";
import { type User } from "@prisma/client";

export const getAllUsers = catchAsyncError<Request, Response<User[]>>(
  async (req, res) => {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  }
);
