import express from "express";
import { authenticateUser, authorizeRoles } from "../middleware/middleware";
import { UserRole } from "@prisma/client";
import { getAllTasks } from "../controllers/tasks/getAllTasks";
import { createTask } from "../controllers/tasks/createTask";
import { updateTask } from "../controllers/tasks/updateTask";
import { deleteTask } from "../controllers/tasks/deleteTask";
import { getTask } from "../controllers/tasks/getTask";
export const taskRouter = express.Router();

taskRouter.get(
  "/",
  authenticateUser,
  authorizeRoles([UserRole.SUPER_ADMIN, UserRole.TENANT_ADMIN]),
  getAllTasks
);

taskRouter.get(
  "/:taskId",
  authenticateUser,
  authorizeRoles([UserRole.SUPER_ADMIN, UserRole.TENANT_ADMIN]),
  getTask
);

taskRouter.post(
  "/",
  authenticateUser,
  authorizeRoles([UserRole.TENANT_ADMIN]),
  createTask
);

taskRouter.patch(
  "/:taskId",
  authenticateUser,
  authorizeRoles([UserRole.TENANT_ADMIN]),
  updateTask
);

taskRouter.delete(
  "/:taskId",
  authenticateUser,
  authorizeRoles([UserRole.TENANT_ADMIN]),
  deleteTask
);
