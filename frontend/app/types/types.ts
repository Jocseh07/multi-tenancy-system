export type AuthResponseFrontend = {
  data: {
    id: string;
    name: string;
    email: string;
    role: UserRole | null;
    tenantId: string | null;
    status: UserStatus;
  };
};

export type UserRole = "SUPER_ADMIN" | "TENANT_ADMIN" | "EMPLOYEE";

export type UserStatus = "APPROVED" | "PENDING" | "REJECTED";

export type User = {
  name: string;
  id: string;
  tenantId: string | null;
  email: string;
  password: string;
  role: UserRole | null;
  status: UserStatus;
};
