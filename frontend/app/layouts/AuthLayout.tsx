import { Navigate, Outlet } from "react-router";
import { useUser } from "~/store/authStore";

export default function AuthLayout() {
  const { isAuthenticated } = useUser();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="background-gradient-primary p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
