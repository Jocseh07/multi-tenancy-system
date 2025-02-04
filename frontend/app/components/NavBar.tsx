import { Link } from "react-router";
import { AuthButtons } from "./AuthButtonts";
import { NavButtons } from "./NavButtons";

export default function NavBar() {
  return (
    <div className="flex items-center justify-between background-gradient-primary p-6 sticky top-2">
      <div className="flex items-center gap-2">
        <div className="text-primary-dark text-2xl">⚡</div>
        <Link to="/" className="text-xl font-bold text-gradient-primary">
          MultiTenant
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <NavButtons />
        <AuthButtons />
      </div>
    </div>
  );
}
