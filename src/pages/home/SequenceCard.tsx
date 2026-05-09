import { Card, CardActionArea, CardContent, Typography } from "@mui/material"
import type Sequence from "../../types/Sequence"
import { Link } from "react-router"


/**
 * Component to display a card for sequence details
 * 
 * @param props Component props object
 * @param props.sequence Sequence object to create the card from
 * @returns JSX element for the Sequence card
 */
function SequenceCard({ sequence }: { sequence: Sequence }) {
  return (
    <Card variant="outlined" sx={{ display: "flex", flexDirection: "column", width: 400 }}>
      <CardActionArea component={Link} to={`/sequence/${sequence.sequenceId}`}  sx={{ flexGrow: 1 }}>
        <CardContent>
          <Typography variant="h5">{sequence.sequenceName}</Typography>
          <Typography>Number of tasks: {sequence.tasks.length}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default SequenceCard
