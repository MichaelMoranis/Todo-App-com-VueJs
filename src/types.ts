export interface Task {
    id: string
    title: string
    done: boolean
}

export type TaskFilter = "Todas" | "Falta" | "Concluidas"