import { axiosInstance } from "./axiosInstance";

export async function getTenants() {
  return await axiosInstance.get("/tenants");
}

export async function getTenant(id: string) {
  return await axiosInstance.get(`/tenants/${id}`);
}

export async function createTenant(data: {
  name: string;
  description: string;
}) {
  return await axiosInstance.post("/tenants", data);
}

export async function updateTenant(
  id: string,
  data: { name: string; description: string }
) {
  return await axiosInstance.patch(`/tenants/${id}`, data);
}

export async function deleteTenant(id: string) {
  return await axiosInstance.delete(`/tenants/${id}`);
}
