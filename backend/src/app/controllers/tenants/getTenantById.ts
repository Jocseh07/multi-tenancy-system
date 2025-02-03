import { Request, Response } from "express";
import { catchAsyncError } from "../../../utils/catchAsyncError";
import { prisma } from "../../../../server";
import { type Tenant } from "@prisma/client";
import { AppError } from "../../../utils/appError";

export const getTenantById = catchAsyncError<
  Request<{ tenantId: string }, {}, {}>,
  Response<Tenant>
>(async (req, res, next) => {
  const { tenantId } = req.params;

  if (!tenantId) {
    next(new AppError("Tenant ID is required", 400));
    return;
  }

  const tenant = await prisma.tenant.findUnique({
    where: { id: tenantId },
  });

  if (!tenant) {
    next(new AppError("Tenant not found", 404));
    return;
  }

  res.status(200).json(tenant);
});
