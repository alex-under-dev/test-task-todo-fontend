

export enum TaskStatus {
    Done = "done",
    Queue = "queue",
    Development = "development"
}

export enum TaskSpecification {
    Development = 'development',
    Done = 'done',
    Queue = 'queue',
}

export enum TaskPriority {
    High = 'high',
    Medium = 'medium',
    Low = 'low'
}
export type File = {
    id: number,
    file_name: string,
    original_name: string
}

export type Task = {
    id: number,
    project_id: number,
    header: string,
    text: TaskSpecification,
    priority: TaskPriority,
    status: TaskStatus,
    created_at_format: string,
    finished_at: string,
    comments: string[],
    sub_tasks: { id: number, text: string, is_completed: boolean }[],
    timesInWork?: string,
    files: File[]
}

export type Comment = {
    id: number,
    text: string,
    parent_id: number,
    children: Comment[];
};