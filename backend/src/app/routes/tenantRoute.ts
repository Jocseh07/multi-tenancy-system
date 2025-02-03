// import { checkCreateTenantBody } from "../../utils/checkCreateTenantBody";
// import { checkTenantId } from "../../utils/checkTenantId";
// import { checkUpdateTenantBody } from "../../utils/checkUpdateTenantBody";
// import {
//   createTenant,
//   getAllTenants,
//   getTenantById,
//   updateTenant,
//   deleteTenant,
// } from "../controllers/tenantController";

// import express from "express";
// import { protect } from "../controllers/authController";

// export const tenantRouter = express.Router();

// tenantRouter.use(protect);

// tenantRouter
//   .route("/")
//   .get(getAllTenants)
//   .post(checkCreateTenantBody, createTenant);
// tenantRouter
//   .route("/:tenantId")
//   .get(getTenantById)
//   .patch(checkTenantId, checkUpdateTenantBody, updateTenant)
//   .delete(checkTenantId, deleteTenant);
