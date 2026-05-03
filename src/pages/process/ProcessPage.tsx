import type { JSX } from "react"
import { useNavigate, useParams } from "react-router"
import { useTasqUserData } from "../../components/TasqUserData"
import type Process from "../../types/Process"
import type Task from "../../types/Task"
import { Button } from "@mui/material"

/**
 * Component to display process information
 * 
 * @returns JSX element for process page
 */
function ProcessPage(): JSX.Element {
  const { procId } = useParams<"procId">() as { procId: string }
  const [userData, dispatch] = useTasqUserData()
  const process: Process = userData.processes[procId]
  const currTask: Task = userData.sequences[process.parentSequenceId].tasks[process.currentTaskIndex]

  const navigate = useNavigate()

  return (
    <>
      <Button onClick={() => navigate("/")}>&lt;&lt; Back to dashboard</Button>
      <h2>Process Details</h2>
      <div>Process ID: {procId}</div>
      <div>Process Name: {process.processName}</div>
      <div>Current task: {currTask.taskName} {currTask.isOptional && "(Optional)"}</div>
      <button onClick={() => dispatch({actionType: "UPDATE-PROCESS", payload: {...process, currentTaskIndex: process.currentTaskIndex - 1}})}>Previous</button>
      <button onClick={() => dispatch({actionType: "UPDATE-PROCESS", payload: {...process, currentTaskIndex: process.currentTaskIndex + 1}})}>Next</button>
    </>
  )
}

export default ProcessPage
