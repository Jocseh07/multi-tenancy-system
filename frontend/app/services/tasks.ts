import { axiosInstance } from "./axiosInstance";
import type { Task } from "~/types/types";

export async function getTasks() {
  return await axiosInstance.get<{ data: Task[] }>("/tasks");
}

export async function getTask(id: string) {
  return await axiosInstance.get<{ data: Task }>(`/tasks/${id}`);
}

type CreateTaskDTO = Pick<Task, "title" | "description" | "status">;

export async function createTask(data: CreateTaskDTO) {
  return await axiosInstance.post<{ data: Task }>("/tasks", data);
}

type UpdateTaskDTO = Pick<Task, "title" | "description" | "status">;
export async function updateTask(id: string, data: UpdateTaskDTO) {
  return await axiosInstance.patch<{ data: Task }>(`/tasks/${id}`, data);
}

export async function deleteTask(id: string) {
  return await axiosInstance.delete(`/tasks/${id}`);
}

export async function getMyTasks() {
  return await axiosInstance.get<{ data: Task[] }>("/tasks/my-tasks");
}

export async function assignTask(taskId: string, userId: string) {
  return await axiosInstance.post<{ data: Task }>(`/tasks/${taskId}/assign`, {
    userId,
  });
}
