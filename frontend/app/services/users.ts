import { axiosInstance } from "./axiosInstance";

export async function getUsers() {
  return await axiosInstance.get("/auth/users");
}

export async function changeUserStatus({
  userId,
  tenantId,
  role,
  userStatus,
}: {
  userId: string;
  tenantId?: string;
  role?: "EMPLOYEE" | "TENANT_ADMIN";
  userStatus: "APPROVED" | "REJECTED";
}) {
  return await axiosInstance.patch(`/auth/admin/status/${userId}`, {
    tenantId,
    role,
    userStatus,
  });
}
