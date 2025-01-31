import { Outlet } from "react-router";

export default function RootLayout() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center ">
      <div className="bg-muted-dark rounded-lg p-4">
        <Outlet />
      </div>
    </div>
  );
}
