const API_URL = "https://localhost:7021/Tasks";

export interface TaskItem{
    name: string;
    isDone: boolean;
}

export const TaskService = {
  getOne: async (): Promise<TaskItem> => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch task");
    return response.json();
  },
};