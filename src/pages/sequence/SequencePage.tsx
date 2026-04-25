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
      <h2>Sequence Details</h2>
      <div>Sequence ID: {seqId}</div>
      <div>Sequence Name: {tasqUserData.sequences[seqId].sequenceName}</div>
      <div>Tasks:</div>
      <ol>
        {tasqUserData.sequences[seqId].tasks.map((t: Task) => {
          return <li key={t.taskId}>{t.taskName} {t.isOptional && "(Optional)"}</li>
        })}
      </ol>
    </>
  )
}

export default SequencePage
