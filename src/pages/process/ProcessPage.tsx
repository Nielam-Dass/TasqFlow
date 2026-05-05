import type { JSX } from "react"
import { Link, useNavigate, useParams } from "react-router"
import { useTasqUserData } from "../../components/TasqUserData"
import type Process from "../../types/Process"
import type Task from "../../types/Task"
import { Box, Button, List, ListItem, Typography } from "@mui/material"
import type Sequence from "../../types/Sequence"

/**
 * Component to display process information
 * 
 * @returns JSX element for process page
 */
function ProcessPage(): JSX.Element {
  const { procId } = useParams<"procId">() as { procId: string }
  const [userData, dispatch] = useTasqUserData()
  const navigate = useNavigate()

  const process: Process = userData.processes[procId]
  if (!process) return <></>
  const currSequence: Sequence = userData.sequences[process.parentSequenceId]
  const currTask: Task = currSequence.tasks[process.currentTaskIndex]

  const handleDelete = (processId: string): void => {
    dispatch({actionType: "DELETE-PROCESS", payload: processId})
    navigate("/")
  }

  return (
    <>
      <Button onClick={() => navigate("/")}>&lt;&lt; Back to dashboard</Button>
      <Box sx={{my: 1}}>
        <Typography variant="h3">Process Details: {process.processName}</Typography>
        <Typography variant="h6">
          From sequence:{" "}
          <Typography variant="inherit" component={Link} to={`/sequence/${currSequence.sequenceId}`} sx={{color: "black"}}>
            {userData.sequences[process.parentSequenceId].sequenceName}
          </Typography>
        </Typography>
        <Typography variant="h6">Current task: {currTask.taskName} {currTask.isOptional && "(Optional)"}</Typography>
        <Typography variant="h6">Coming Up:</Typography>
        <List>
          {currSequence.tasks.slice(process.currentTaskIndex+1, process.currentTaskIndex+6).map((t: Task) => <ListItem key={t.taskId}>{t.taskName} {t.isOptional && "(Optional)"}</ListItem>)}
        </List>
      </Box>
      <Box sx={{display: "flex", gap: 1, mb: 2}}>
        <Button variant="outlined" onClick={() => dispatch({actionType: "UPDATE-PROCESS", payload: {...process, currentTaskIndex: process.currentTaskIndex - 1}})}>Previous</Button>
        <Button variant="outlined" onClick={() => dispatch({actionType: "UPDATE-PROCESS", payload: {...process, currentTaskIndex: process.currentTaskIndex + 1}})}>Next</Button><br />
      </Box>
      <Button variant="outlined" color="error" onClick={() => handleDelete(process.processId)}>Delete</Button>
    </>
  )
}

export default ProcessPage
