import { Button, Input, type InputRef } from "antd";
import type { Route } from "./+types/home";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { signInSchema } from "~/types/schemas";
import { useSignin, useUser } from "~/store/authStore";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login" },
    { name: "description", content: "Login to Multi-Tenant App!" },
  ];
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef<InputRef>(null);
  const passwordRef = useRef<InputRef>(null);
  const signin = useSignin();
  const user = useUser();

  const handleSignIn = async () => {
    const email = emailRef.current?.input?.value;
    const password = passwordRef.current?.input?.value;
    const formData = { email, password };
    const validated = signInSchema.safeParse(formData);

    if (!validated.success) {
      for (const error of validated.error?.errors ?? []) {
        toast.error(error.message);
      }
      return;
    }
    setIsLoading(true);
    try {
      await signin(validated.data.email, validated.data.password);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className="text-center space-y-2">
        <div className="text-4xl mb-2">⚡</div>
        <h2 className="text-3xl font-bold text-gradient-primary">
          Welcome Back
        </h2>
        <p className="text-sm text-muted-foreground-dark">
          Or{" "}
          <a
            href="/signup"
            className="font-medium text-primary-dark hover:text-accent-dark transition-colors"
          >
            create a new account
          </a>
        </p>
      </div>

      <div className="w-full space-y-6">
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
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-foreground-dark"
            >
              Password
            </label>
            <Input.Password
              size="large"
              required
              placeholder="Enter your password"
              ref={passwordRef}
            />
          </div>
        </div>

        <Button
          type="primary"
          size="large"
          loading={isLoading}
          onClick={handleSignIn}
          className="w-full "
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </Button>
      </div>
    </div>
  );
}
