import { Task } from "@prisma/client";
import { catchAsyncError } from "../../../utils/catchAsyncError";
import { TokenPayload } from "../../../types/types";
import { AppError } from "../../../utils/appError";
import { Request, Response } from "express";
import { prisma } from "../../../../server";

type UpdateTaskBody = Omit<Task, "id" | "tenantId" | "tenant">;
type UpdateTaskParams = {
  taskId: string;
};

export const updateTask = catchAsyncError<
  Request<UpdateTaskParams, {}, UpdateTaskBody> & { user?: TokenPayload },
  Response<Task>
>(async (req, res, next) => {
  const { taskId } = req.params;
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

  const task = await prisma.task.update({
    where: { id: taskId, tenantId },
    data: { title, description, status, assignedTo },
  });

  res.status(200).json(task);
});
