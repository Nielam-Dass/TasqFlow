import { useRef } from "react"
import {v4 as uuidv4} from "uuid"
import type Process from "../../types/Process"


/**
 * Component to create a new process
 * 
 * @param props NewProcessForm props object
 * @param props.onCreate Function that accepts a newly created Process object and adds it to the user data
 * @returns JSX element for a form to add a new process
 */
function NewProcessForm({ onCreate }: { onCreate(p: Process): void }) {
  const procNameRef = useRef<HTMLInputElement>(null)
  const procSeqIdRef = useRef<HTMLInputElement>(null)
  const procTaskIdx = useRef<HTMLInputElement>(null)

  const handleCreate: React.MouseEventHandler<HTMLButtonElement> = (): void => {
    if(procNameRef.current && procSeqIdRef.current && procTaskIdx.current) {
      const newProcess: Process = {
        processId: uuidv4(),
        processName: procNameRef.current.value, 
        parentSequenceId: procSeqIdRef.current.value, 
        currentTaskIndex: Number.parseInt(procTaskIdx.current.value)
      }
      onCreate(newProcess)
    }
  }
  
  return (
    <>
      <label htmlFor="proc-name">Process Name: </label>
      <input type="text" id="proc-name" ref={procNameRef}/><br/>
      <label htmlFor="proc-seq-id">Sequence ID: </label>
      <input type="text" id="proc-seq-id" ref={procSeqIdRef}/><br/>
      <label htmlFor="proc-task-index">Starting Task Index: </label>
      <input type="number" id="proc-task-index" ref={procTaskIdx}/><br/>
      <button onClick={handleCreate}>Create</button>
    </>
  )
}

export default NewProcessForm