import { type ReactNode } from "react";
import { useIsHydrated } from "~/store/authStore";
import Loading from "./Loading";

interface HydrationGuardProps {
  children: ReactNode;
}

export function HydrationGuard({ children }: HydrationGuardProps) {
  const isHydrated = useIsHydrated();

  if (!isHydrated) {
    return <Loading />;
  }

  return children;
}
