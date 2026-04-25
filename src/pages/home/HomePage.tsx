import type { JSX } from "react"
import { useTasqUserData } from "../../components/TasqUserData"
import { Link } from "react-router"
import NewProcessForm from "./NewProcessForm"
import type Process from "../../types/Process"
import NewSequenceForm from "./NewSequenceForm"
import type Sequence from "../../types/Sequence"


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
        <h3>Your Processes:</h3>
        {
          Object.entries(tasqUserData.processes).length &&
          Object.entries(tasqUserData.processes).map(([procId, proc]): JSX.Element => <div key={procId}><Link to={`/process/${procId}`}>{proc.processName}</Link></div>) ||
          <div>No processes</div>
        }
      </div>
      <div>
        <h3>New Sequence:</h3>
        <NewSequenceForm onCreate={(s: Sequence) => dispatch({ actionType: "NEW-SEQUENCE", payload: s})}/>
      </div>
      <div>
        <h3>Your Sequences:</h3>
        {
          Object.entries(tasqUserData.sequences).length &&
          Object.entries(tasqUserData.sequences).map(([seqId, seq]): JSX.Element => <div key={seqId}><Link to={`/sequence/${seqId}`}>{seq.sequenceName}</Link></div>) ||
          <div>No sequences</div>
        }
      </div>
    </>
  )
}

export default HomePage
