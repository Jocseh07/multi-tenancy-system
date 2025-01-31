import { Outlet } from "react-router";
import NavBar from "~/components/NavBar";

export default function RootLayout() {
  return (
    <div className="flex h-dvh w-dvw flex-col container mx-auto">
      <div className="p-2 w-full h-full flex flex-col gap-2">
        <NavBar />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
