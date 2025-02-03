import { Task } from "@prisma/client";
import { catchAsyncError } from "../../../utils/catchAsyncError";
import { TokenPayload } from "../../../types/types";
import { prisma } from "../../../../server";
import { Request, Response } from "express";
import { AppError } from "../../../utils/appError";

type DeleteTaskParams = {
  taskId: string;
};

export const deleteTask = catchAsyncError<
  Request<DeleteTaskParams, {}, {}> & { user?: TokenPayload },
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

  const task = await prisma.task.delete({
    where: { id: taskId, tenantId },
  });

  res.status(200).json(task);
});
