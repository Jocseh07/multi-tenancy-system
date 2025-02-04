import { useNavigate } from "react-router";
import { useAuthStore } from "~/store/authStore";

export const Authenticated = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  if (!user?.data) {
    navigate("/login");
    return null;
  }

  return children;
};
