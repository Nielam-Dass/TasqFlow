import type Process from "./Process";
import type { ProcessID } from "./Process";
import type Sequence from "./Sequence";
import type { SequenceID } from "./Sequence";

export default interface UserData {
    sequences: Record<SequenceID, Sequence>;
    processes: Record<ProcessID, Process>;
}
