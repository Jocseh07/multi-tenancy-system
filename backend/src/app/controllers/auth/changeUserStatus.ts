import { Request, Response } from "express";
import { catchAsyncError } from "../../../utils/catchAsyncError";
import { AppError } from "../../../utils/appError";
import { prisma } from "../../../../server";
import { User, UserRole, UserStatus } from "@prisma/client";

type ChangeUserStatusBody = {
  tenantId: string;
  role: UserRole;
  userStatus: UserStatus;
};

type ChangeUserStatusParams = {
  userId: string;
};

type ChangeUserStatusResponse = {
  message: string;
  user: User;
};

export const changeUserStatus = catchAsyncError<
  Request<ChangeUserStatusParams, {}, ChangeUserStatusBody>,
  Response<ChangeUserStatusResponse>
>(async (req, res, next) => {
  const { userId } = req.params;
  const { tenantId, role, userStatus } = req.body;

  if (!tenantId || !role || !userStatus) {
    next(new AppError("Missing required fields", 400));
    return;
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    next(new AppError("User not found", 404));
    return;
  }

  if (user.status === "APPROVED") {
    next(new AppError("User is already approved", 400));
    return;
  }

  if (user.status === "REJECTED") {
    next(new AppError("User is already rejected", 400));
    return;
  }

  if (user.role === UserRole.SUPER_ADMIN) {
    next(new AppError("Super Admin cannot be changed", 400));
    return;
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { tenantId, role, status: userStatus },
  });

  res.status(200).json({ message: "User approved", user: updatedUser });
});
