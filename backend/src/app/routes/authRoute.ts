import express from "express";
import { signUp } from "../controllers/auth/signUp";
import { login } from "../controllers/auth/signIn";
import { getAllUsers } from "../controllers/auth/getAllUsers";
import { changeUserStatus } from "../controllers/auth/changeUserStatus";
import { authenticateUser, authorizeRoles } from "../middleware/middleware";
import { UserRole } from "@prisma/client";
import { deleteUser } from "../controllers/auth/deleteUser";

export const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", login);
// authRouter.get(
//   "/users",
//   authenticateUser,
//   authorizeRoles([
//     UserRole.SUPERADMIN,
//     UserRole.TENANT_OWNER,
//     UserRole.TENANT_ADMIN,
//   ]),
//   getAllUsers
// );
authRouter.patch(
  "/admin/status/:userId",
  // authenticateUser,
  // authorizeRoles([
  //   UserRole.SUPERADMIN,
  //   UserRole.TENANT_OWNER,
  //   UserRole.TENANT_ADMIN,
  // ]),
  changeUserStatus
);

// For manual testing only
authRouter.get("/users", getAllUsers);
authRouter.delete("/users/delete/:userId", deleteUser);
