import { Outlet, redirect } from "react-router";
import { useUser } from "~/store/authStore";

export default function SuperAdminRouteLayout() {
  const { user } = useUser();
  const isSuperAdmin = user?.data?.role === "SUPER_ADMIN";
  const isAllowed = isSuperAdmin;

  if (!isAllowed) {
    redirect("/unauthorized");
    return null;
  }

  return <Outlet />;
}
