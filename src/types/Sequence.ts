import type Task from "./Task"

export type SequenceID = string;

export default interface Sequence {
    sequenceId: string;
    sequenceName: SequenceID;
    tasks: Task[];
}
