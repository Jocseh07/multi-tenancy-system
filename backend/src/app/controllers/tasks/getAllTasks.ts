import { Response } from "express";
import { catchAsyncError } from "../../../utils/catchAsyncError";
import { prisma } from "../../../../server";
import { UserRole, type User, type Task } from "@prisma/client";
import { AuthRequest } from "../../../types/types";
import { AppError } from "../../../utils/appError";

export const getAllTasks = catchAsyncError<AuthRequest, Response<Task[]>>(
  async (req, res, next) => {
    const userRole = req.user?.role;

    if (userRole === UserRole.SUPER_ADMIN) {
      const tasks = await prisma.task.findMany();
      res.status(200).json(tasks);
      return;
    } else if (userRole === UserRole.TENANT_ADMIN) {
      const tasks = await prisma.task.findMany({
        where: {
          tenantId: req.user?.tenantId,
        },
      });
      res.status(200).json(tasks);
      return;
    } else if (userRole === UserRole.EMPLOYEE) {
      const tasks = await prisma.task.findMany({
        where: {
          assignedTo: req.user?.userId,
        },
      });
      res.status(200).json(tasks);
      return;
    } else {
      next(new AppError("Unauthorized", 403));
      return;
    }
  }
);
