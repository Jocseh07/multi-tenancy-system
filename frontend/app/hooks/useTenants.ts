import { useQuery } from "@tanstack/react-query";
import { getTenants } from "~/services/tenants";

export const useTenants = () => {
  return useQuery({
    queryKey: ["tenants"],
    queryFn: getTenants,
  });
};
