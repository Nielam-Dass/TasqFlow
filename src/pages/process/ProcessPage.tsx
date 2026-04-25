import type { JSX } from "react"
import { useParams } from "react-router"
import { useTasqUserData } from "../../components/TasqUserData"
import type Process from "../../types/Process"

/**
 * Component to display process information
 * 
 * @returns JSX element for process page
 */
function ProcessPage(): JSX.Element {
  const { procId } = useParams<"procId">() as { procId: string }
  const [userData, dispatch] = useTasqUserData()
  const process: Process = userData.processes[procId]

  return (
    <>
      <div>Process ID: {procId}</div>
      <div>Process Name: {process.processName}</div>
      <div>Current task: {userData.sequences[process.parentSequenceId].tasks[process.currentTaskIndex].taskName}</div>
      <button onClick={() => dispatch({actionType: "UPDATE-PROCESS", payload: {...process, currentTaskIndex: process.currentTaskIndex + 1}})}>Next</button>
      <button onClick={() => dispatch({actionType: "UPDATE-PROCESS", payload: {...process, currentTaskIndex: process.currentTaskIndex - 1}})}>Previous</button>
    </>
  )
}

export default ProcessPage
