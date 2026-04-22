import type { JSX } from "react"
import { useParams } from "react-router"
import { useTasqUserData } from "../../components/TasqUserData"

/**
 * Component to display sequence of tasks
 * 
 * @returns JSX element for sequence page
 */
function SequencePage(): JSX.Element {
  const { seqId } = useParams<"seqId">() as { seqId: string }
  const tasqUserData = useTasqUserData()

  return (
    <>
      <div>Sequence ID: {seqId}</div>
      <div>Sequence Name: {tasqUserData.sequences[seqId].sequenceName}</div>
      <div>Number of tasks: {tasqUserData.sequences[seqId].tasks.length}</div>
    </>
  )
}

export default SequencePage
