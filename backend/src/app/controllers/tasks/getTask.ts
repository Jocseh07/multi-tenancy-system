import { Task } from "@prisma/client";
import { catchAsyncError } from "../../../utils/catchAsyncError";
import { TokenPayload } from "../../../types/types";
import { AppError } from "../../../utils/appError";
import { Request, Response } from "express";
import { prisma } from "../../../../server";

type GetTaskParams = {
  taskId: string;
};

export const getTask = catchAsyncError<
  Request<GetTaskParams, {}, {}> & { user?: TokenPayload },
  Response<Task>
>(async (req, res, next) => {
  const { taskId } = req.params;

  if (!taskId) {
    next(new AppError("Task ID is required", 400));
    return;
  }

  const tenantId = req.user?.tenantId;

  if (!tenantId) {
    next(new AppError("Tenant ID is required", 400));
    return;
  }

  const task = await prisma.task.findUnique({
    where: { id: taskId, tenantId },
  });

  if (!task) {
    next(new AppError("Task not found", 404));
    return;
  }

  res.status(200).json(task);
});
