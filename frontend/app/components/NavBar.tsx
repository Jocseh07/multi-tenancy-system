import { Button, Layout } from "antd";
import { Link } from "react-router";

export default function NavBar() {
  return (
    <div className="flex items-center justify-between ring-border-dark ring-2 rounded-lg p-4 bg-muted-dark">
      <div className="flex items-center">
        <Link to="/" className="text-xl font-bold">
          MultiTenant
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <Link to="/tenants">
          <Button type="default" size="large">
            Tenants
          </Button>
        </Link>
        <Link to="/signin">
          <Button type="default" size="large">
            Sign In
          </Button>
        </Link>
        <Link to="/signup">
          <Button type="primary" size="large">
            Sign Up
          </Button>
        </Link>
      </div>
    </div>
  );
}
