import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Multi-Tenant App" },
    { name: "description", content: "Welcome to Multi-Tenant App!" },
  ];
}

export default function Home() {
  return <div></div>;
}
