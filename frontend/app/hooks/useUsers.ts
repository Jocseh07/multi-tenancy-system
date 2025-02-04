import { useQuery } from "@tanstack/react-query";
import { getUsers } from "~/services/users";

export const useUsers = () => {
  const query = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
    staleTime: 1000 * 60 * 5, // Optional: cache data for 5 minutes
  });

  return query;
};
