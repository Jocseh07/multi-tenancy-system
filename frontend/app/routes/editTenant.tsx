import { Button, Input, type InputRef } from "antd";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { Authenticated } from "~/components/Authenticated";
import type { Route } from "./+types/editTenant";
import { getTenant, updateTenant } from "~/services/tenants";
import type { TextAreaRef } from "antd/es/input/TextArea";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Edit Tenant" },
    { name: "description", content: "Edit tenant details" },
  ];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  return await getTenant(params.tenantId);
}

export default function EditTenant({ loaderData }: Route.ComponentProps) {
  const tenant: {
    id: string;
    name: string;
    description: string;
  } = loaderData.data;
  const [isLoading, setIsLoading] = useState(false);
  const nameRef = useRef<InputRef>(null);
  const descriptionRef = useRef<TextAreaRef>(null);
  const navigate = useNavigate();

  const handleUpdateTenant = async () => {
    const name = nameRef.current?.input?.value;
    const description =
      descriptionRef.current?.resizableTextArea?.textArea.value;

    if (!name || !description) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      await updateTenant(tenant.id, {
        name,
        description,
      });
      toast.success("Tenant updated successfully");
      navigate("/tenants");
    } catch (error) {
      toast.error("Failed to update tenant");
    } finally {
      setIsLoading(false);
    }
  };

  if (!tenant) {
    return null; // Or a loading spinner
  }

  return (
    <Authenticated role="SUPER_ADMIN">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="background-gradient-primary p-8">
            <div className="text-center space-y-2 mb-8">
              <h2 className="text-3xl font-bold text-gradient-primary">
                Edit Tenant
              </h2>
              <p className="text-sm text-muted-foreground-dark">
                Update tenant information
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground-dark"
                >
                  Tenant Name
                </label>
                <Input
                  size="large"
                  required
                  placeholder="Enter tenant name"
                  ref={nameRef}
                  defaultValue={tenant.name}
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-foreground-dark"
                >
                  Description
                </label>
                <Input.TextArea
                  size="large"
                  required
                  placeholder="Enter tenant description"
                  ref={descriptionRef}
                  defaultValue={tenant.description}
                  rows={4}
                />
              </div>

              <Button
                type="primary"
                size="large"
                loading={isLoading}
                onClick={handleUpdateTenant}
                className="w-full"
              >
                {isLoading ? "Updating..." : "Update Tenant"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Authenticated>
  );
}
