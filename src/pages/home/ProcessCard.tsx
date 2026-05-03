import { Card, CardActionArea, CardContent, Typography } from "@mui/material"
import type Process from "../../types/Process"
import { Link } from "react-router"
import { useTasqUserData } from "../../components/TasqUserData"
import type { JSX } from "react"


/**
 * Component to display a card for process details
 * 
 * @param props Component props object
 * @param props.process Process object to create the card from
 * @returns JSX element for the Process card
 */
function ProcessCard({ process }: { process: Process }): JSX.Element {
  const [userData, _] = useTasqUserData()
  return (
    <Card variant="outlined" sx={{ width: 360 }}>
      <CardActionArea component={Link} to={`/process/${process.processId}`}>
        <CardContent>
          <Typography variant="h5">{process.processName}</Typography>
          <Typography>Sequence: {userData.sequences[process.parentSequenceId].sequenceName}</Typography>
          <Typography>Current Task: {userData.sequences[process.parentSequenceId].tasks[process.currentTaskIndex].taskName}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default ProcessCard
