import { Link } from "react-router";
import { AuthButtons } from "./AuthButtonts";

export default function NavBar() {
  return (
    <div className="flex items-center justify-between bg-background-dark/95 backdrop-blur-sm ring-border-dark ring-1 rounded-lg p-6 sticky top-2">
      <div className="flex items-center gap-2">
        <div className="text-primary-dark text-2xl">⚡</div>
        <Link
          to="/"
          className="text-xl font-bold bg-gradient-to-r from-primary-dark to-accent-dark bg-clip-text text-transparent"
        >
          MultiTenant
        </Link>
      </div>

      <AuthButtons />
    </div>
  );
}
