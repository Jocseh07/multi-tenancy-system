import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Edit Tenant" },
    { name: "description", content: "Edit Tenant to Multi-Tenant App!" },
  ];
}

export default function Home() {
  return <div>Edit Tenant</div>;
}
