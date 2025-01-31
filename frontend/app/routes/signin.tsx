import { Button, Input, type InputRef } from "antd";
import type { Route } from "./+types/home";
import { useRef } from "react";
import { toast } from "sonner";
import { signInSchema } from "~/types/schemas";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login" },
    { name: "description", content: "Login to Multi-Tenant App!" },
  ];
}

export default function Home() {
  const emailRef = useRef<InputRef>(null);
  const passwordRef = useRef<InputRef>(null);

  const handleSignIn = () => {
    const email = emailRef.current?.input?.value;
    const password = passwordRef.current?.input?.value;
    const formData = { email, password };
    const validated = signInSchema.safeParse(formData);

    console.log(validated.error?.errors);

    if (!validated.success) {
      for (const error of validated.error?.errors ?? []) {
        toast.error(error.message);
      }
      return;
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-background-dark rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground-dark">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground-dark">
            Or{" "}
            <a
              href="/signup"
              className="font-medium text-primary-dark hover:text-muted-foreground-dark"
            >
              create a new account
            </a>
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground-dark"
              >
                Email address
              </label>
              <Input
                size="large"
                required
                placeholder="Enter your email"
                type="email"
                ref={emailRef}
                className="mt-1"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-foreground-dark"
              >
                Password
              </label>
              <Input
                size="large"
                required
                placeholder="Enter your password"
                ref={passwordRef}
                type="password"
                className="mt-1"
              />
            </div>
          </div>

          <Button
            type="primary"
            size="large"
            onClick={handleSignIn}
            className="w-full flex justify-center py-2 px-4"
          >
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
}
