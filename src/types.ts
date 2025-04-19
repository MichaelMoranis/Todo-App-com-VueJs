export interface Task {
    id: string
    title: string
    done: boolean
}

export type TaskFilter = "all" | "todo" | "done"