import type { JSX } from "react"
import { useTasqUserData } from "../../components/TasqUserData"
import { Link } from "react-router"
import NewProcessForm from "./NewProcessForm"
import type Process from "../../types/Process"


/**
 * Component to display home page with processes and sequences
 * 
 * @returns JSX element for home page
 */
function HomePage(): JSX.Element {
  const [tasqUserData, dispatch] = useTasqUserData()

  return (
    <>
      <h2>TasqFlow Dashboard</h2>
      <div>
        <h3>New Process:</h3>
        <NewProcessForm onCreate={(p: Process) => dispatch({ actionType: "NEW-PROCESS", payload: p})}/>
      </div>
      <div>
        <h3>Processes:</h3>
        {
          Object.entries(tasqUserData.processes).length &&
          Object.entries(tasqUserData.processes).map(([procId, proc]): JSX.Element => <Link key={procId} to={`/process/${procId}`}>{proc.processName}</Link>) ||
          <div>No processes</div>
        }
      </div>
      <div>
        <h3>Sequences:</h3>
        {
          Object.entries(tasqUserData.sequences).length &&
          Object.entries(tasqUserData.sequences).map(([seqId, seq]): JSX.Element => <Link key={seqId} to={`/sequence/${seqId}`}>{seq.sequenceName}</Link>) ||
          <div>No sequences</div>
        }
      </div>
    </>
  )
}

export default HomePage
