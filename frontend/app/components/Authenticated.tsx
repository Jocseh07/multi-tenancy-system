import { useNavigate } from "react-router";
import { useAuthStore } from "~/store/authStore";

export const Authenticated = ({
  children,
  superAdmin,
  tenantAdmin,
}: {
  children: React.ReactNode;
  superAdmin?: boolean;
  tenantAdmin?: boolean;
}) => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  const isSuperAdmin = user.data.role === "SUPER_ADMIN";
  const isTenantAdmin = user.data.role === "TENANT_ADMIN";

  // If superAdmin flag is set, only allow super admins
  if (superAdmin && !isSuperAdmin) {
    navigate(`/unauthorized?role=${user.data.role}`);
    return null;
  }

  // If tenantAdmin flag is set, allow both tenant admins and super admins
  if (tenantAdmin && !isSuperAdmin && !isTenantAdmin) {
    navigate(`/unauthorized?role=${user.data.role}`);
    return null;
  }

  // If no flags set or conditions pass, render children
  return children;
};
