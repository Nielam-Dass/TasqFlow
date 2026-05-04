import type { JSX } from "react"
import { useNavigate, useParams } from "react-router"
import { useTasqUserData } from "../../components/TasqUserData"
import type Process from "../../types/Process"
import type Task from "../../types/Task"
import { Box, Button, Typography } from "@mui/material"

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
  const currTask: Task = userData.sequences[process.parentSequenceId].tasks[process.currentTaskIndex]

  const handleDelete = (processId: string): void => {
    dispatch({actionType: "DELETE-PROCESS", payload: processId})
    navigate("/")
  }

  return (
    <>
      <Button onClick={() => navigate("/")}>&lt;&lt; Back to dashboard</Button>
      <Box sx={{my: 1}}>
        <Typography variant="h3">Process Details</Typography>
        <Typography variant="h6">Process ID: {procId}</Typography>
        <Typography variant="h6">Process Name: {process.processName}</Typography>
        <Typography variant="h6">Current task: {currTask.taskName} {currTask.isOptional && "(Optional)"}</Typography>
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
