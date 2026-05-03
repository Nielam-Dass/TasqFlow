import type { JSX } from "react"
import { useTasqUserData } from "../../components/TasqUserData"
import NewProcessForm from "./NewProcessForm"
import type Process from "../../types/Process"
import NewSequenceForm from "./NewSequenceForm"
import type Sequence from "../../types/Sequence"
import { Box, Typography } from "@mui/material"
import ProcessCard from "./ProcessCard"
import SequenceCard from "./SequenceCard"


/**
 * Component to display home page with processes and sequences
 * 
 * @returns JSX element for home page
 */
function HomePage(): JSX.Element {
  const [tasqUserData, dispatch] = useTasqUserData()

  return (
    <>
      <Typography variant="h3" sx={{my: 2}}>Main Dashboard</Typography>
      <Box sx={{mt: 2}}>
        <Typography variant="h5">New Process:</Typography>
        <NewProcessForm onCreate={(p: Process) => dispatch({ actionType: "NEW-PROCESS", payload: p})}/>
      </Box>
      <Box sx={{mt: 2}}>
        <Typography variant="h5">Your Processes:</Typography>
        {
          Object.entries(tasqUserData.processes).length &&
          <Box sx={{display: "flex", gap: 2, flexWrap: "wrap"}}>
            {Object.entries(tasqUserData.processes).map(([procId, proc]): JSX.Element => <ProcessCard key={procId} process={proc}/>)}
          </Box> ||
          <div>No processes</div>
        }
      </Box>
      <Box sx={{mt: 2}}>
        <Typography variant="h5">New Sequence:</Typography>
        <NewSequenceForm onCreate={(s: Sequence) => dispatch({ actionType: "NEW-SEQUENCE", payload: s})}/>
      </Box>
      <Box sx={{mt: 2}}>
        <Typography variant="h5">Your Sequences:</Typography>
        {
          Object.entries(tasqUserData.sequences).length &&
          <Box sx={{display: "flex", gap: 2, flexWrap: "wrap"}}>
            {Object.entries(tasqUserData.sequences).map(([seqId, seq]): JSX.Element => <SequenceCard key={seqId} sequence={seq}/>)}
          </Box> ||
          <div>No sequences</div>
        }
      </Box>
    </>
  )
}

export default HomePage
