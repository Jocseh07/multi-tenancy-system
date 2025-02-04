import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./layouts/RootLayout.tsx", [
    // ...prefix("tenants", [
    //   index("routes/tenants.tsx"),
    //   route("create", "routes/createTenant.tsx"),
    //   route(":tenantId", "routes/editTenant.tsx"),
    // ]),
    layout("./layouts/AuthLayout.tsx", [
      route("signin", "routes/signin.tsx"),
      route("signup", "routes/signup.tsx"),
    ]),
    index("routes/home.tsx"),
    route("unauthorized/:role?", "routes/unauthorized.tsx"),
    layout("./layouts/SuperAdminRouteLayout.tsx", [
      ...prefix("tenants", [
        index("routes/tenants.tsx"),
        route("create", "routes/createTenant.tsx"),
        route(":tenantId", "routes/editTenant.tsx"),
      ]),
    ]),
    layout("./layouts/AdminRouteLayout.tsx", [
      route("users", "routes/users.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
