export type AuthResponseFrontend = {
  data: {
    id: string;
    name: string;
    email: string;
    role: "SUPER_ADMIN" | "TENANT_ADMIN" | "EMPLOYEE" | null;
    tenantId: string | null;
    status: "APPROVED" | "PENDING" | "REJECTED";
  };
};
