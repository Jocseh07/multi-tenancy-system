import { Request, Response } from "express";
import { catchAsyncError } from "../../../utils/catchAsyncError";
import { prisma } from "../../../../server";
import { type Tenant } from "@prisma/client";
import { AppError } from "../../../utils/appError";

type DeleteTenantParams = {
  tenantId: string;
};

type DeleteTenantResponse = {
  message: string;
};

export const deleteTenant = catchAsyncError<
  Request<DeleteTenantParams>,
  Response<DeleteTenantResponse>
>(async (req, res, next) => {
  const { tenantId } = req.params;

  if (!tenantId) {
    next(new AppError("Tenant ID is required", 400));
    return;
  }

  const tenant = await prisma.tenant.delete({
    where: { id: tenantId },
  });

  res.status(200).json({
    message: "Tenant deleted successfully",
  });
});
