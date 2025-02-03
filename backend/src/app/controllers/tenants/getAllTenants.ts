import { Request, Response } from "express";
import { catchAsyncError } from "../../../utils/catchAsyncError";
import { prisma } from "../../../../server";
import { type Tenant } from "@prisma/client";

export const getAllTenants = catchAsyncError<Request, Response<Tenant[]>>(
  async (req, res) => {
    const tenants = await prisma.tenant.findMany();
    res.status(200).json(tenants);
  }
);
