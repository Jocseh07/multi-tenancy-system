import express from "express";
import { getAllUsers, login, signUp } from "../controllers/authController";

export const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/login", login);
authRouter.get("/users", getAllUsers);
