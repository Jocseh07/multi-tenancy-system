import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Tenants" },
    { name: "description", content: "Tenants to Multi-Tenant App!" },
  ];
}

export default function Tenants() {
  return <div>Tenants</div>;
}
