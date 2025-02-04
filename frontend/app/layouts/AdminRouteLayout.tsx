import { Outlet, redirect } from "react-router";
import { useUser } from "~/store/authStore";

export default function AdminRouteLayout() {
  const { user } = useUser();
  const isSuperAdmin = user?.data?.role === "SUPER_ADMIN";
  const isTenantAdmin = user?.data?.role === "TENANT_ADMIN";
  const isAllowed = isSuperAdmin || isTenantAdmin;

  if (!isAllowed) {
    redirect("/unauthorized");
    return null;
  }

  return <Outlet />;
}
