import { Outlet } from "react-router";
import { Authenticated } from "~/components/Authenticated";

export default function AdminRouteLayout() {
  return (
    <Authenticated tenantAdmin>
      <Outlet />
    </Authenticated>
  );
}
