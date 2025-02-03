import { Request, Response } from "express";
import { catchAsyncError } from "../../../utils/catchAsyncError";
import { prisma } from "../../../../server";
import { type Tenant } from "@prisma/client";
import { AppError } from "../../../utils/appError";

type UpdateTenantBody = {
  name: string;
};

type UpdateTenantParams = {
  tenantId: string;
};

type UpdateTenantResponse = {
  message: string;
  tenant: Tenant;
};

export const updateTenant = catchAsyncError<
  Request<UpdateTenantParams, {}, UpdateTenantBody>,
  Response<UpdateTenantResponse>
>(async (req, res, next) => {
  const { tenantId } = req.params;
  const { name } = req.body;

  if (!name) {
    next(new AppError("Name is required", 400));
    return;
  }

  const tenant = await prisma.tenant.update({
    where: { id: tenantId },
    data: { name },
  });

  res.status(200).json({
    message: "Tenant updated successfully",
    tenant,
  });
});
