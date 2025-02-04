import { Button, Input, type InputRef } from "antd";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { Authenticated } from "~/components/Authenticated";
import { createTenant } from "~/services/tenants";
import type { TextAreaRef } from "antd/es/input/TextArea";
import type { Route } from "./+types/createTenant";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Create Tenant" },
    { name: "description", content: "Create a new tenant" },
  ];
}

export default function CreateTenant() {
  const [isLoading, setIsLoading] = useState(false);
  const nameRef = useRef<InputRef>(null);
  const descriptionRef = useRef<TextAreaRef>(null);
  const navigate = useNavigate();

  const handleCreateTenant = async () => {
    const name = nameRef.current?.input?.value;
    const description =
      descriptionRef.current?.resizableTextArea?.textArea.value;

    if (!name || !description) {
      toast.error("Please fill in all fields");
      return;
    }
    const toastId = "create-tenant";

    setIsLoading(true);
    try {
      toast.loading("Creating tenant...", { id: toastId });
      await createTenant({
        name,
        description,
      });
      toast.success("Tenant created successfully", { id: toastId });
      navigate("/tenants");
    } catch (error) {
      toast.error("Failed to create tenant", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Authenticated role="SUPER_ADMIN">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="background-gradient-primary p-8">
            <div className="text-center space-y-2 mb-8">
              <h2 className="text-3xl font-bold text-gradient-primary">
                Create New Tenant
              </h2>
              <p className="text-sm text-muted-foreground-dark">
                Add a new tenant to your organization
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
                  rows={4}
                />
              </div>

              <Button
                type="primary"
                size="large"
                loading={isLoading}
                onClick={handleCreateTenant}
                className="w-full"
              >
                {isLoading ? "Creating..." : "Create Tenant"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Authenticated>
  );
}
