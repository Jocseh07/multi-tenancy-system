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
    <div className="flex flex-col gap-4">
      <div>
        <label htmlFor="name">Email</label>
        <Input
          size="large"
          required
          placeholder="Email"
          type="email"
          ref={emailRef}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <Input
          size="large"
          required
          placeholder="Password"
          ref={passwordRef}
          type="password"
        />
      </div>
      <Button type="primary" size="large" onClick={handleSignIn}>
        Sign In
      </Button>
    </div>
  );
}
