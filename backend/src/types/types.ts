export interface Tenant {
  tenantId: string;
  name: string;
  email: string;
  active: boolean;
  phone?: string | null;
}

export interface GetAllTenantsQueryParams extends qs.ParsedQs {
  page?: string;
  limit?: string;
  sort?: string;
}

export type CreateTenantBody = Omit<Tenant, "tenantId">;
export type UpdateTenantBody = Partial<Tenant>;
export type TenantParams = { tenantId: string };

export interface ResponseError extends Error {
  status?: string;
  statusCode?: number;
}

export interface User {
  userId: string;
  name: string;
  email: string;
  password: string;
}

export interface UserResponse {
  data: User;
  token: string;
}

export type CreateUserBody = Omit<User, "userId">;
export type LoginBody = Omit<User, "userId" | "name">;
