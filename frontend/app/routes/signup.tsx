import { Button, Input, type InputRef } from "antd";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { signUpSchema } from "~/types/schemas";
import { useSignup } from "~/store/authStore";
import type { Route } from "./+types/signup";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Signup" },
    { name: "description", content: "Signup to Multi-Tenant App!" },
  ];
}

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const nameRef = useRef<InputRef>(null);
  const emailRef = useRef<InputRef>(null);
  const passwordRef = useRef<InputRef>(null);
  const signup = useSignup();

  const handleSignUp = async () => {
    const name = nameRef.current?.input?.value;
    const email = emailRef.current?.input?.value;
    const password = passwordRef.current?.input?.value;
    const formData = { name, email, password };
    const validated = signUpSchema.safeParse(formData);

    if (!validated.success) {
      for (const error of validated.error?.errors ?? []) {
        toast.error(error.message);
      }
      return;
    }

    setIsLoading(true);
    try {
      await signup(
        validated.data.name,
        validated.data.email,
        validated.data.password
      );
    } catch (error) {
      // Error is already handled by toast.promise in the auth store
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className="text-center space-y-2">
        <div className="text-4xl mb-2">⚡</div>
        <h2 className="text-3xl font-bold text-gradient-primary">
          Create Account
        </h2>
        <p className="text-sm text-muted-foreground-dark">
          Or{" "}
          <a
            href="/signin"
            className="font-medium text-primary-dark hover:text-accent-dark transition-colors"
          >
            sign in to your account
          </a>
        </p>
      </div>

      <div className="w-full space-y-6">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-foreground-dark"
            >
              Full Name
            </label>
            <Input
              size="large"
              required
              placeholder="Enter your full name"
              type="text"
              ref={nameRef}
            />
          </div>
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
          onClick={handleSignUp}
          className="w-full"
        >
          {isLoading ? "Signing Up..." : "Sign Up"}
        </Button>
      </div>
    </div>
  );
}
