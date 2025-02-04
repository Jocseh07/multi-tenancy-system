import { Button } from "antd";
import { useNavigate } from "react-router";
import type { Route } from "./+types/unauthorized";
import type { UserRole } from "~/types/types";
import { Authenticated } from "~/components/Authenticated";

export function meta() {
  return [
    { title: "Unauthorized" },
    { name: "description", content: "Unauthorized Access" },
  ];
}

export default function Unauthorized({ params }: Route.LoaderArgs) {
  const navigate = useNavigate();
  const role = params.role as UserRole | undefined;

  const isValidRole = role
    ? ["SUPER_ADMIN", "TENANT_ADMIN", "EMPLOYEE"].includes(role)
    : false;

  return (
    <Authenticated>
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-background-dark/95 backdrop-blur-sm rounded-lg shadow-xl ring-1 ring-border-dark p-8">
            <div className="flex flex-col items-center justify-center space-y-8">
              <div className="text-center space-y-2">
                <div className="text-4xl mb-2">⚠️</div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-dark to-accent-dark bg-clip-text text-transparent">
                  Unauthorized Access
                </h2>
                <p className="text-sm text-muted-foreground-dark">
                  {role && isValidRole
                    ? `You need ${role} permissions to access this page`
                    : "You don't have permission to access this page"}
                </p>
              </div>

              <div className="w-full space-y-6">
                <Button
                  type="primary"
                  size="large"
                  onClick={() => navigate("/")}
                  className="w-full bg-gradient-to-r from-primary-dark to-accent-dark border-none hover:opacity-90 transition-opacity"
                >
                  Go to Home
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Authenticated>
  );
}
