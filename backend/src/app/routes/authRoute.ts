import express from "express";
import { signUp } from "../controllers/auth/signUp";
import { login } from "../controllers/auth/signIn";
import { getAllUsers } from "../controllers/auth/getAllUsers";
import { changeUserStatus } from "../controllers/auth/changeUserStatus";
import { authenticateUser, authorizeRoles } from "../middleware/middleware";
import { UserRole } from "@prisma/client";
import { signOut } from "../controllers/auth/signOut";
// import { deleteUser } from "../controllers/auth/deleteUser";

export const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", login);
authRouter.post("/signout", signOut);
authRouter.get(
  "/users",
  authenticateUser,
  authorizeRoles([UserRole.SUPER_ADMIN, UserRole.TENANT_ADMIN]),
  getAllUsers
);
authRouter.patch(
  "/admin/status/:userId",
  authenticateUser,
  authorizeRoles([UserRole.SUPER_ADMIN, UserRole.TENANT_ADMIN]),
  changeUserStatus
);

// For manual testing only
// authRouter.get("/users", getAllUsers);
// authRouter.delete("/users/delete/:userId", deleteUser);
