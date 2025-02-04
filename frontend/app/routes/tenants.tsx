import type { Route } from "./+types/tenants";
import { deleteTenant, getTenants } from "~/services/tenants";
import { Link, useNavigate } from "react-router";
import { Button } from "antd";
import { toast } from "sonner";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Tenants" },
    { name: "description", content: "Tenants to Multi-Tenant App!" },
  ];
}

export async function clientLoader() {
  return await getTenants();
}
clientLoader.hydrate = true as const;

export default function Tenants({ loaderData }: Route.ComponentProps) {
  const tenants = loaderData.data;
  const navigate = useNavigate();
  const handleDelete = async (id: string) => {
    toast.promise(deleteTenant(id), {
      loading: "Deleting tenant...",
      success: "Tenant deleted successfully",
      error: "Failed to delete tenant",
    });
    navigate("/tenants");
  };

  return (
    <div className="p-6 w-full h-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-foreground dark:text-foreground-dark">
          Tenants
        </h1>
        <Link to="/tenants/create">
          <Button type="primary" size="large">
            Create Tenant
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {tenants.map(
          (tenant: { id: string; name: string; description: string }) => (
            <div key={tenant.id} className="background-gradient-primary p-6">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h2 className="text-xl font-semibold text-foreground-dark">
                    {tenant.name}
                  </h2>
                  <p className="text-muted-foreground-dark">
                    {tenant.description}
                  </p>
                </div>
                <div className="flex gap-1">
                  <Link to={`/tenants/${tenant.id}`}>
                    <Button type="primary">Edit</Button>
                  </Link>
                  <Button
                    type="primary"
                    danger
                    onClick={() => handleDelete(tenant.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
