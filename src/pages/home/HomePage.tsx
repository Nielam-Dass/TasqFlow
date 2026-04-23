import type { JSX } from "react"
import { useTasqUserData } from "../../components/TasqUserData"
import { Link } from "react-router"

/**
 * Component to display home page with processes and sequences
 * 
 * @returns JSX element for home page
 */
function HomePage(): JSX.Element {
  const [tasqUserData, _] = useTasqUserData()

  return (
    <>
      <h2>TasqFlow Dashboard</h2>
      <div>
        <h3>New Process:</h3>
      </div>
      <div>
        <h3>Processes:</h3>
      </div>
      <div>
        <h3>Sequences:</h3>
        {
          Object.entries(tasqUserData.sequences).map(([seqId, seq]): JSX.Element => {
            return <Link key={seqId} to={`/sequence/${seqId}`}>{seq.sequenceName}</Link>
          })
        }
      </div>
    </>
  )
}

export default HomePage
