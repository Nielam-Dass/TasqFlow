import {v4 as uuidv4} from "uuid"
import type Process from "../../types/Process"
import { Controller, useForm, type SubmitHandler } from "react-hook-form"
import { Box, Button, TextField } from "@mui/material"


/**
 * Component to create a new process
 * 
 * @param props NewProcessForm props object
 * @param props.onCreate Function that accepts a newly created Process object and adds it to the user data
 * @returns JSX element for a form to add a new process
 */
function NewProcessForm({ onCreate }: { onCreate(p: Process): void }) {

  const handleCreate: SubmitHandler<FormValues> = (data: FormValues): void => {
    const newProcess: Process = {
        processId: uuidv4(),
        processName: data.procName, 
        parentSequenceId: data.procSeqId, 
        currentTaskIndex: Number.parseInt(data.procTaskIndex)
      }
      onCreate(newProcess)
  }

  type FormValues = {
    procName: string,
    procSeqId: string,
    procTaskIndex: string
  }

  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      procName: "",
      procSeqId: "",
      procTaskIndex: ""
    }
  })
  
  return (
    
    <form onSubmit={handleSubmit(handleCreate)}>
      <Box sx={{display: "flex", flexDirection: "column", gap: 1, width: 400}}>
        <Controller control={control} name="procName" render={({ field }) => (
          <TextField  {...field} label="Process Name" />
        )} />
        <Controller control={control} name="procSeqId" render={({ field }) => (
          <TextField  {...field} label="Sequence ID" />
        )} />
        <Controller control={control} name="procTaskIndex" render={({ field }) => (
          <TextField  {...field} label="Starting Task Index" />
        )} />
        <Button type="submit" variant="contained">Create</Button>
      </Box>
    </form>
    
  )
}

export default NewProcessForm