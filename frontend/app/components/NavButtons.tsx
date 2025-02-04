import { Button } from "antd";
import { Link } from "react-router";
import { useUser } from "~/store/authStore";

export function NavButtons() {
  const { isAuthenticated, user } = useUser();

  if (!isAuthenticated || !user) {
    return null;
  }
  const isSuperAdmin = user.data.role === "SUPER_ADMIN";
  const isTenantAdmin = user.data.role === "TENANT_ADMIN";

  return (
    <div className="flex items-center gap-2">
      {isSuperAdmin && (
        <Link to="/tenants">
          <Button type="primary" size="large">
            Tenants
          </Button>
        </Link>
      )}
      {(isSuperAdmin || isTenantAdmin) && (
        <Link to="/users">
          <Button type="primary" size="large">
            Users
          </Button>
        </Link>
      )}
    </div>
  );
}
