import { Request, Response } from "express";
import { catchAsyncError } from "../../../utils/catchAsyncError";
import { prisma } from "../../../../server";
import { type Tenant } from "@prisma/client";
import { AppError } from "../../../utils/appError";

type CreateTenantBody = {
  name: string;
  description?: string;
};

type CreateTenantResponse = {
  message: string;
  tenant: Tenant;
};

export const createTenant = catchAsyncError<
  Request<{}, {}, CreateTenantBody>,
  Response<CreateTenantResponse>
>(async (req, res, next) => {
  const { name, description } = req.body;

  if (!name) {
    next(new AppError("Name is required", 400));
    return;
  }

  const tenant = await prisma.tenant.create({
    data: { name, description },
  });

  res.status(201).json({
    message: "Tenant created successfully",
    tenant,
  });
});
