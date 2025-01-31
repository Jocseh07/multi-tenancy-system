import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./layouts/RootLayout.tsx", [
    index("routes/home.tsx"),
    ...prefix("tenants", [
      index("routes/tenants.tsx"),
      route("create", "routes/createTenant.tsx"),
      route(":tenantId", "routes/editTenant.tsx"),
    ]),
    layout("./layouts/AuthLayout.tsx", [
      route("signin", "routes/signin.tsx"),
      route("signup", "routes/signup.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
