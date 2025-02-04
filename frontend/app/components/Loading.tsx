import { Spin } from "antd";

export default function Loading() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <Spin size="large" />
    </div>
  );
}
