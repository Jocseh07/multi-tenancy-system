import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Signup" },
    { name: "description", content: "Signup to Multi-Tenant App!" },
  ];
}

export default function Home() {
  return <div>Signup</div>;
}
