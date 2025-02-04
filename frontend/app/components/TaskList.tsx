import { Table, Tag, Button, Popconfirm } from "antd";
import type { Task } from "~/types/types";
import { Link, useNavigate } from "react-router";
import { useUser } from "~/store/authStore";
import { deleteTask } from "~/services/tasks";
import { toast } from "sonner";

type TaskListProps = {
  tasks: Task[];
};

export function TaskList({ tasks }: TaskListProps) {
  const { user } = useUser();
  const navigate = useNavigate();
  const isSuperAdmin = user?.data.role === "SUPER_ADMIN";
  const isTenantAdmin = user?.data.role === "TENANT_ADMIN";
  const isAdmin = isSuperAdmin || isTenantAdmin;

  const handleDelete = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      toast.success("Task deleted successfully");
      navigate("/tasks");
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text: string, record: Task) => (
        <Link to={`/tasks/${record.id}`}>{text}</Link>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag
          color={
            status === "COMPLETED"
              ? "green"
              : status === "IN_PROGRESS"
              ? "blue"
              : "orange"
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (priority: string) => (
        <Tag
          color={
            priority === "HIGH"
              ? "red"
              : priority === "MEDIUM"
              ? "yellow"
              : "blue"
          }
        >
          {priority}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Task) => (
        <div className="flex gap-2">
          {isAdmin && (
            <>
              <Link to={`/tasks/${record.id}/edit`}>
                <Button type="primary">Edit</Button>
              </Link>
              <Link to={`/tasks/${record.id}/assign`}>
                <Button>Assign</Button>
              </Link>
              <Popconfirm
                title="Delete task"
                description="Are you sure you want to delete this task?"
                onConfirm={() => handleDelete(record.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button danger>Delete</Button>
              </Popconfirm>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <Table
      dataSource={tasks}
      columns={columns}
      rowKey="id"
      pagination={{
        pageSize: 10,
        showSizeChanger: false,
      }}
    />
  );
}
