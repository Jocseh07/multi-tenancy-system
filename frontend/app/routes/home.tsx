import { useAuthStore } from "~/store/authStore";
import type { Route } from "./+types/home";
import { Authenticated } from "~/components/Authenticated";
import type { AuthResponseFrontend } from "~/types/types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Multi-Tenant App" },
    { name: "description", content: "Welcome to Multi-Tenant App!" },
  ];
}

export default function Home() {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || !user) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-background-dark/95 backdrop-blur-sm rounded-lg shadow-xl ring-1 ring-border-dark p-8">
            <div className="text-center space-y-2">
              <div className="text-4xl mb-2">🔒</div>
              <h2 className="text-3xl font-bold text-gradient-primary">
                Please Log In
              </h2>
              <p className="text-sm text-muted-foreground-dark">
                Sign in to access your account
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const status = getStatusMessage(user);

  return (
    <Authenticated>
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-3xl">
          <div className="background-gradient-primary p-8">
            <div className="text-center space-y-4">
              <span className="text-4xl block">{status?.icon}</span>
              <h2 className={`text-3xl font-bold text-gradient-primary`}>
                {status?.title}
              </h2>
              <p className="text-muted-foreground-dark">{status?.message}</p>
            </div>

            {user.data.status === "APPROVED" && (
              <div className="mt-8 border-t border-border-dark pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-secondary-dark rounded-lg flex flex-col items-center justify-center text-center">
                    <h3 className="font-semibold text-primary-dark">
                      Profile Details
                    </h3>
                    <ul className="mt-2 space-y-2">
                      <li className="text-muted-foreground-dark">
                        Email: {user.data.email}
                      </li>
                      <li className="text-muted-foreground-dark">
                        ID: {user.data.id}
                      </li>
                      {user.data.tenantId && (
                        <li className="text-muted-foreground-dark">
                          Tenant ID: {user.data.tenantId}
                        </li>
                      )}
                    </ul>
                  </div>
                  <div className="p-4 bg-secondary-dark rounded-lg flex flex-col items-center justify-center text-center">
                    <h3 className="font-semibold text-primary-dark">
                      Access Level
                    </h3>
                    <p className="mt-2 text-muted-foreground-dark font-bold">
                      Role: {user.data.role?.replace("_", " ")}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Authenticated>
  );
}

const getStatusMessage = (user: AuthResponseFrontend) => {
  switch (user.data.status) {
    case "PENDING":
      return {
        title: "Account Under Review",
        message:
          "Your account is pending approval. We'll notify you once it's reviewed.",
        icon: "⏳",
      };
    case "REJECTED":
      return {
        title: "Account Rejected",
        message:
          "Unfortunately, your account request has been rejected. Please contact support for more information.",
        icon: "❌",
      };
    case "APPROVED":
      return {
        title: `Welcome, ${user.data.name}!`,
        message: `You are logged in as ${user.data.role
          ?.toLowerCase()
          .replace("_", " ")}`,
        icon: "✅",
      };
  }
};
