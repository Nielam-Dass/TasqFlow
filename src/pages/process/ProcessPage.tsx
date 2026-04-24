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
  const [userData, _] = useTasqUserData()
  const process: Process = userData.processes[procId]

  return (
    <>
      <div>Process ID: {procId}</div>
      <div>Process Name: {process.processName}</div>
      <div>Current task: {userData.sequences[process.parentSequenceId].tasks[process.currentTaskIndex].taskName}</div>
    </>
  )
}

export default ProcessPage
