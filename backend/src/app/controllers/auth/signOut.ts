import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "../../../utils/catchAsyncError";

export const signOut = catchAsyncError<Request, Response>(
  async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 0,
    });
    res.status(200).json({ message: "Signed out successfully" });
  }
);
