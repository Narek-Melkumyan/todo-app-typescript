export type TodoStatus = "pending" | "in_progress" | "completed";

export type Todo = {
    id: number;
    title: string;
    description: string;
    status: TodoStatus;
    created_at: string;
};

export type TodoCreate = {
    title: string;
    description?: string;
    status?: TodoStatus;
};

