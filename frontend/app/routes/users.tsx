import { Button, Table, type TableProps } from "antd";
import { useState } from "react";
import { toast } from "sonner";
import { getUsers, changeUserStatus } from "~/services/users";
import type { Route } from "./+types/users";
import type { User } from "~/types/types";
import { useUser } from "~/store/authStore";
import { redirect, useNavigate } from "react-router";
import type { AxiosError } from "axios";

export function meta() {
  return [{ title: "Users" }, { name: "description", content: "Manage Users" }];
}

export async function clientLoader() {
  const users = await getUsers();
  return { users: users.data };
}
clientLoader.hydrate = true as const;

export default function Users({ loaderData }: Route.ComponentProps) {
  const users = loaderData.users;
  const [isLoading, setIsLoading] = useState(false);
  const { user: currentUser } = useUser();
  const isSuperAdmin = currentUser?.data.role === "SUPER_ADMIN";
  const navigate = useNavigate();

  const handleApprove = async (
    userId: string,
    role: "EMPLOYEE" | "TENANT_ADMIN"
  ) => {
    const toastId = "approve-user";
    setIsLoading(true);
    toast.loading("Approving user...", { id: toastId });
    try {
      await changeUserStatus({
        userId,
        tenantId: currentUser?.data.tenantId ?? "",
        role,
        userStatus: "APPROVED",
      });
      toast.success("User approved successfully", { id: toastId });
      // Refresh users list
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message, { id: toastId });
    } finally {
      setIsLoading(false);
    }
    navigate("/users");
  };

  const handleReject = async (userId: string) => {
    const toastId = "reject-user";
    setIsLoading(true);
    toast.loading("Rejecting user...", { id: toastId });
    try {
      await changeUserStatus({
        userId,
        tenantId: currentUser?.data.tenantId ?? "",
        userStatus: "REJECTED",
      });
      toast.success("User rejected successfully", { id: toastId });
      // Refresh users list
      const response = await getUsers();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message, { id: toastId });
    } finally {
      setIsLoading(false);
    }
    navigate("/users");
  };

  const columns: TableProps<User>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name: string) => name,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email: string) => email,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            status === "APPROVED"
              ? "bg-green-100 text-green-800"
              : status === "REJECTED"
              ? "bg-red-100 text-red-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground-dark font-bold">
            {role}
          </span>
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => {
        if (record.id === currentUser?.data.id) return null;
        return (
          <div className="flex gap-2">
            {isSuperAdmin ? (
              <Button
                type="primary"
                size="middle"
                onClick={() => handleApprove(record.id, "TENANT_ADMIN")}
              >
                Approve as Admin
              </Button>
            ) : (
              <Button
                type="primary"
                size="middle"
                onClick={() => handleApprove(record.id, "EMPLOYEE")}
              >
                Approve
              </Button>
            )}
            <Button
              danger
              size="middle"
              onClick={() => handleReject(record.id)}
            >
              Reject
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex-1 flex flex-col w-full  mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gradient-primary">Users</h1>
          <p className="text-sm text-muted-foreground-dark mt-1">
            Manage user access and permissions
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg w-full">
        <Table
          dataSource={users}
          columns={columns}
          rowKey="id"
          loading={isLoading}
          pagination={{
            pageSize: 10,
            showSizeChanger: false,
            showTotal: (total) => `Total ${total} users`,
          }}
          className="w-full"
        />
      </div>
    </div>
  );
}
