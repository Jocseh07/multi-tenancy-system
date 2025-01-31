import { Button, Input, type InputRef } from "antd";
import type { Route } from "./+types/home";
import { useRef } from "react";
import { toast } from "sonner";
import { signUpSchema } from "~/types/schemas";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Signup" },
    { name: "description", content: "Signup to Multi-Tenant App!" },
  ];
}

export default function Home() {
  const nameRef = useRef<InputRef>(null);
  const emailRef = useRef<InputRef>(null);
  const passwordRef = useRef<InputRef>(null);

  const handleSignUp = () => {
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
  };

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-background-dark rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground-dark">
            Create a new account
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground-dark">
            Or{" "}
            <a
              href="/signin"
              className="font-medium text-primary-dark hover:text-muted-foreground-dark"
            >
              sign in to your account
            </a>
          </p>
        </div>
        <div className="mt-8 space-y-6">
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
                className="mt-1"
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
            onClick={handleSignUp}
            className="w-full flex justify-center py-2 px-4"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
}
