import { Link } from "react-router";
import { AuthButtons } from "./AuthButtonts";

export default function NavBar() {
  return (
    <div className="flex items-center justify-between background-gradient-primary p-6 sticky top-2">
      <div className="flex items-center gap-2">
        <div className="text-primary-dark text-2xl">⚡</div>
        <Link to="/" className="text-xl font-bold text-gradient-primary">
          MultiTenant
        </Link>
      </div>

      <AuthButtons />
    </div>
  );
}
