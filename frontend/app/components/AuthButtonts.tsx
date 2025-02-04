import { Button } from "antd";
import { Link } from "react-router";
import { useUser, useSignout } from "~/store/authStore";
export const AuthButtons = () => {
  const { isAuthenticated } = useUser();

  const signout = useSignout();

  return (
    <div className="flex items-center gap-4">
      {isAuthenticated ? (
        <Button type="default" size="large" onClick={signout}>
          Sign Out
        </Button>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};
