import { Task } from "@prisma/client";
import { AuthRequest, TokenPayload } from "../../../types/types";
import { catchAsyncError } from "../../../utils/catchAsyncError";
import { Request, Response } from "express";
import { prisma } from "../../../../server";
import { AppError } from "../../../utils/appError";

type CreateTaskBody = Omit<Task, "id" | "tenantId" | "tenant">;

export const createTask = catchAsyncError<
  Request<{}, {}, CreateTaskBody> & { user?: TokenPayload },
  Response<Task>
>(async (req, res, next) => {
  const { title, description, status, assignedTo } = req.body;

  if (!title || !description) {
    next(new AppError("Missing required fields", 400));
    return;
  }

  const tenantId = req.user?.tenantId;

  if (!tenantId) {
    next(new AppError("Tenant ID is required", 400));
    return;
  }

  const task = await prisma.task.create({
    data: {
      title,
      description,
      status,
      assignedTo,
      tenantId,
    },
  });

  res.status(201).json(task);
});
