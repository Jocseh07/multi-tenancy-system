import { Response } from "express";
import { catchAsyncError } from "../../../utils/catchAsyncError";
import { prisma } from "../../../../server";
import { UserRole, type User } from "@prisma/client";
import { AuthRequest } from "../../../types/types";
import { AppError } from "../../../utils/appError";

export const getAllUsers = catchAsyncError<AuthRequest, Response<User[]>>(
  async (req, res, next) => {
    const userRole = req.user?.role;

    if (userRole === UserRole.SUPER_ADMIN) {
      const users = await prisma.user.findMany();
      res.status(200).json(users);
      return;
    } else if (userRole === UserRole.TENANT_ADMIN) {
      const users = await prisma.user.findMany({
        where: {
          tenantId: req.user?.tenantId,
        },
      });
      res.status(200).json(users);
      return;
    } else {
      next(new AppError("Unauthorized", 403));
      return;
    }
  }
);
