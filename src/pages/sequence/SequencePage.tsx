import type { JSX } from "react"
import { useNavigate, useParams } from "react-router"
import { useTasqUserData } from "../../components/TasqUserData"
import type Task from "../../types/Task"
import { Button } from "@mui/material"

/**
 * Component to display sequence of tasks
 * 
 * @returns JSX element for sequence page
 */
function SequencePage(): JSX.Element {
  const { seqId } = useParams<"seqId">() as { seqId: string }
  const [tasqUserData, dispatch] = useTasqUserData()
  const navigate = useNavigate()

  const sequence = tasqUserData.sequences[seqId]
  if (!sequence) return <></>

  const handleDelete = (): void => {
    dispatch({actionType: "DELETE-SEQUENCE", payload: seqId})
    navigate("/")
  }

  return (
    <>
      <Button onClick={() => navigate("/")}>&lt;&lt; Back to dashboard</Button>
      <h2>Sequence Details</h2>
      <div>Sequence ID: {seqId}</div>
      <div>Sequence Name: {tasqUserData.sequences[seqId].sequenceName}</div>
      <div>Tasks:</div>
      <ol>
        {tasqUserData.sequences[seqId].tasks.map((t: Task) => {
          return <li key={t.taskId}>{t.taskName} {t.isOptional && "(Optional)"}</li>
        })}
      </ol>
      <button onClick={handleDelete}>Delete</button>
    </>
  )
}

export default SequencePage
