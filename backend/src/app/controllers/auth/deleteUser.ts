import { Request, Response } from "express";
import { catchAsyncError } from "../../../utils/catchAsyncError";
import { AppError } from "../../../utils/appError";
import { prisma } from "../../../../server";

type DeleteUserParams = {
  userId: string;
};

type DeleteUserResponse = {
  message: string;
};

export const deleteUser = catchAsyncError<
  Request<DeleteUserParams>,
  Response<DeleteUserResponse>
>(async (req, res, next) => {
  const { userId } = req.params;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    next(new AppError("User not found", 404));
    return;
  }

  await prisma.user.delete({
    where: { id: userId },
  });

  res.status(200).json({ message: "User deleted successfully" });
});
