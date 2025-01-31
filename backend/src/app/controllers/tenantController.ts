import { NextFunction, Request, Response } from "express";
import {
  CreateTenantBody,
  GetAllTenantsQueryParams,
  TenantParams,
  UpdateTenantBody,
  Tenant,
} from "../../types/types";
import { prisma } from "../../../server";
import { catchAsyncError } from "../../utils/catchAsyncError";
import { AppError } from "../../utils/appError";

export const getAllTenants = catchAsyncError<
  Request<{}, {}, {}, GetAllTenantsQueryParams> & { userId?: string },
  Response<Tenant[]>
>(
  async (
    req: Request<{}, {}, {}, GetAllTenantsQueryParams> & { userId?: string },
    res: Response<Tenant[]>,
    next: NextFunction
  ) => {
    const tenants = await prisma.tenant.findMany({
      where: {
        userId: req.userId,
      },
    });
    res.status(200).json(tenants);
  }
);

export const createTenant = catchAsyncError<
  Request<{}, {}, CreateTenantBody> & { userId?: string },
  Response<Tenant>
>(
  async (
    req: Request<{}, {}, CreateTenantBody> & { userId?: string },
    res: Response<Tenant>,
    next: NextFunction
  ) => {
    if (!req.userId) {
      next(new AppError("Unauthorized", 401));
      return;
    }
    const existingTenant = await prisma.tenant.findFirst({
      where: {
        userId: req.userId,
        email: req.body.email,
      },
    });

    if (existingTenant) {
      next(new AppError("Tenant already exists", 400));
      return;
    }

    const tenant = await prisma.tenant.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        active: req.body.active,
        user: {
          connect: {
            userId: req.userId,
          },
        },
      },
    });

    if (!tenant) {
      next(new AppError("Failed to create tenant", 500));
      return;
    }

    res.status(201).json(tenant);
  }
);

export const getTenantById = catchAsyncError<
  Request<TenantParams> & { userId?: string },
  Response<Tenant>
>(
  async (
    req: Request<TenantParams> & { userId?: string },
    res: Response<Tenant>,
    next: NextFunction
  ) => {
    const tenant = await prisma.tenant.findUnique({
      where: {
        tenantId: req.params.tenantId,
        userId: req.userId,
      },
    });

    if (!tenant) {
      next(
        new AppError("Tenant not found with id: " + req.params.tenantId, 404)
      );
      return;
    }

    res.status(200).json(tenant);
  }
);

export const updateTenant = catchAsyncError<
  Request<TenantParams, {}, UpdateTenantBody> & { userId?: string },
  Response<Tenant>
>(
  async (
    req: Request<TenantParams, {}, UpdateTenantBody> & { userId?: string },
    res: Response<Tenant>,
    next: NextFunction
  ) => {
    const tenant = await prisma.tenant.update({
      where: {
        tenantId: req.params.tenantId,
        userId: req.userId,
      },
      data: {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        active: req.body.active,
      },
    });

    if (!tenant) {
      next(
        new AppError("Tenant not found with id: " + req.params.tenantId, 404)
      );
      return;
    }

    res.status(200).json(tenant);
  }
);

export const deleteTenant = catchAsyncError<
  Request<TenantParams> & { userId?: string },
  Response<Tenant>
>(
  async (
    req: Request<TenantParams> & { userId?: string },
    res: Response<Tenant>,
    next: NextFunction
  ) => {
    const tenant = await prisma.tenant.delete({
      where: {
        tenantId: req.params.tenantId,
        userId: req.userId,
      },
    });

    if (!tenant) {
      next(
        new AppError("Tenant not found with id: " + req.params.tenantId, 404)
      );
      return;
    }

    res.status(200).json(tenant);
  }
);
