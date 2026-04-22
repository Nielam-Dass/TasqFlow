import type { SequenceID } from "./Sequence";

export type ProcessID = string;

export default interface Process {
    processId: ProcessID;
    processName: string;
    parentSequenceId: SequenceID;
    currentTaskIndex: number;
}
