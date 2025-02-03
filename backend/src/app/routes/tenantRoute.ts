import express from "express";
import { authenticateUser, authorizeRoles } from "../middleware/middleware";
import { getAllTenants } from "../controllers/tenants/getAllTenants";
import { UserRole } from "@prisma/client";
import { createTenant } from "../controllers/tenants/createTenant";
import { updateTenant } from "../controllers/tenants/updateTenant";
import { deleteTenant } from "../controllers/tenants/deleteTenant";
import { getCurrentTenant } from "../controllers/tenants/getCurrentTenant";
import { getTenantById } from "../controllers/tenants/getTenantById";

export const tenantRouter = express.Router();

tenantRouter.use(authenticateUser);

// tenantRouter
//   .route("/")
//   .get(getAllTenants)
//   .post(checkCreateTenantBody, createTenant);
// tenantRouter
//   .route("/:tenantId")
//   .get(getTenantById)
//   .patch(checkTenantId, checkUpdateTenantBody, updateTenant)
//   .delete(checkTenantId, deleteTenant);

tenantRouter
  .get("/", authorizeRoles([UserRole.SUPER_ADMIN]), getAllTenants)
  .post("/", authorizeRoles([UserRole.SUPER_ADMIN]), createTenant);

tenantRouter.get("/current", getCurrentTenant);

tenantRouter
  .get("/:tenantId", authorizeRoles([UserRole.SUPER_ADMIN]), getTenantById)
  .patch(
    "/:tenantId",
    authorizeRoles([UserRole.SUPER_ADMIN, UserRole.TENANT_ADMIN]),
    updateTenant
  )
  .delete("/:tenantId", authorizeRoles([UserRole.SUPER_ADMIN]), deleteTenant);
