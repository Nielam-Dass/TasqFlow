import { useRef } from "react"
import type Sequence from "../../types/Sequence"
import Papa from "papaparse"
import type Task from "../../types/Task"
import {v4 as uuidv4} from "uuid"


/**
 * Component to create a new sequence
 * 
 * @param props NewSequenceForm props object
 * @param props.onCreate Function that accepts newly create Sequence object and adds it to the user data 
 * @returns JSX element for the form to add a new sequence
 */
function NewSequenceForm({ onCreate }: { onCreate(s: Sequence): void }) {
  const fileRef = useRef<HTMLInputElement>(null)
  const seqNameRef = useRef<HTMLInputElement>(null)

  const handleCreate: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (seqNameRef.current && fileRef.current && fileRef.current.files) {
      const seqNameVal: string = seqNameRef.current.value
      const file = fileRef.current.files[0]
      const reader = new FileReader()

      reader.onload = () => {
        const fileContent: string = reader.result as string
        const fileData = Papa.parse<string>(fileContent).data
        const taskList: Task[] = fileData.map((row: string): Task => {
          return {
            taskId: uuidv4(), 
            taskName: row[0],
            isOptional: row[1]==="0"
          } 
        })
        const newSequence: Sequence = {
          sequenceId: uuidv4(),
          sequenceName: seqNameVal,
          tasks: taskList
        }
        onCreate(newSequence)
      }
      reader.readAsText(file)
    }
  }
  return (
    <>
      <label htmlFor="new-seq-name">Sequence Name: </label>
      <input type="text" id="new-seq-name" ref={seqNameRef}/><br />
      <input type="file" ref={fileRef}/><br />
      <button onClick={handleCreate}>Create</button>
    </>
  )
}

export default NewSequenceForm
