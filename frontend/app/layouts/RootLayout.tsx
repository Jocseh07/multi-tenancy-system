import { Outlet } from "react-router";
import { HydrationGuard } from "~/components/HydrationGuard";
import NavBar from "~/components/NavBar";

export default function RootLayout() {
  return (
    <div className="h-dvh w-dvw bg-gradient-to-br from-background-dark via-muted-dark to-background-dark flex">
      <HydrationGuard>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-full py-4 w-full flex flex-col gap-6">
            <NavBar />
            <main className="flex-1 flex">
              <Outlet />
            </main>
          </div>
        </div>
      </HydrationGuard>
    </div>
  );
}
