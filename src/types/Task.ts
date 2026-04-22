export type TaskID = string

export default interface Task {
    taskId: TaskID;
    taskName: string;
    isOptional: boolean;
}
