import { Outlet } from "react-router";
import { Authenticated } from "~/components/Authenticated";
export default function SuperAdminRouteLayout() {
  return (
    <Authenticated role="SUPER_ADMIN">
      <Outlet />
    </Authenticated>
  );
}
