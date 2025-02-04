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

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  assignedTo: string | null;
  tenantId: string;
};

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";
