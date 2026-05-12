import type { JSX } from "react"
import { useNavigate, useParams } from "react-router"
import { useTasqUserData } from "../../components/TasqUserData"
import type Task from "../../types/Task"
import { Box, Button, List, ListItem, Typography } from "@mui/material"

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
      <Box sx={{my: 1}}>
        <Typography variant="h3">Sequence Details: {sequence.sequenceName}</Typography>
        <Typography variant="h6">Sequence ID: {seqId}</Typography>
        <Typography variant="h6">Tasks:</Typography>
        <List sx={{listStyle: "decimal", pl: 4}}>
          {tasqUserData.sequences[seqId].tasks.map((t: Task) => {
            return <ListItem key={t.taskId} sx={{display: "list-item"}}>{t.taskName} {t.isOptional && "(Optional)"}</ListItem>
          })}
        </List>
      </Box>
      <Button variant="outlined" color="error" onClick={handleDelete}>Delete</Button>
    </>
  )
}

export default SequencePage
