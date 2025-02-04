import { useNavigate } from "react-router";
import { useAuthStore } from "~/store/authStore";
import type { UserRole } from "~/types/types";

export const Authenticated = ({
  children,
  role,
}: {
  children: React.ReactNode;
  role?: UserRole;
}) => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  if (user.data.role && role && user.data.role !== role) {
    navigate(`/unauthorized/${role}`);
    return null;
  }

  return children;
};
