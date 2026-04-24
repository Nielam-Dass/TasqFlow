import type { JSX } from "react"
import { useParams } from "react-router"
import { useTasqUserData } from "../../components/TasqUserData"
import type Task from "../../types/Task"

/**
 * Component to display sequence of tasks
 * 
 * @returns JSX element for sequence page
 */
function SequencePage(): JSX.Element {
  const { seqId } = useParams<"seqId">() as { seqId: string }
  const [tasqUserData, _] = useTasqUserData()

  return (
    <>
      <div>Sequence ID: {seqId}</div>
      <div>Sequence Name: {tasqUserData.sequences[seqId].sequenceName}</div>
      <div>Tasks:</div>
      <ul>
        {tasqUserData.sequences[seqId].tasks.map((t: Task) => {
          return <li>{t.taskName}</li>
        })}
      </ul>
    </>
  )
}

export default SequencePage
