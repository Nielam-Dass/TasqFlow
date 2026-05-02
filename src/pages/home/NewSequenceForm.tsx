import type Sequence from "../../types/Sequence"
import Papa from "papaparse"
import type Task from "../../types/Task"
import {v4 as uuidv4} from "uuid"
import { Controller, useForm, type SubmitHandler } from "react-hook-form"
import { Box, Button, TextField, Typography } from "@mui/material"


/**
 * Component to create a new sequence
 * 
 * @param props NewSequenceForm props object
 * @param props.onCreate Function that accepts newly create Sequence object and adds it to the user data 
 * @returns JSX element for the form to add a new sequence
 */
function NewSequenceForm({ onCreate }: { onCreate(s: Sequence): void }) {
  type FormValues = {
    seqName: string;
    taskFile: FileList | null;
  }

  const { handleSubmit, control, register, watch } = useForm<FormValues>({
    defaultValues: {
      seqName: "",
      taskFile: null
    }
  })

  const taskFile = watch("taskFile")

  const handleCreate: SubmitHandler<FormValues> = (data: FormValues): void => {
      const reader = new FileReader()

      reader.onload = () => {
        const fileContent: string = reader.result as string
        const fileData: string[][] = Papa.parse<string[]>(fileContent).data
        const taskList: Task[] = fileData.map((row: string[]): Task => {
          return {
            taskId: uuidv4(), 
            taskName: row[0],
            isOptional: row[1]==="0"
          }
        })
        const newSequence: Sequence = {
          sequenceId: uuidv4(),
          sequenceName: data.seqName,
          tasks: taskList
        }
        onCreate(newSequence)
      }

      data.taskFile && reader.readAsText(data.taskFile[0])
  }

  return (
    <form onSubmit={handleSubmit(handleCreate)}>
      <Box sx={{display: "flex", flexDirection: "column", gap: 1, width: 400}}>
        <Controller control={control} name="seqName" render={({ field }) => (
          <TextField  {...field} label="Sequence Name" />
        )} />
        <Button component="label" variant="outlined">
          Upload Task CSV File
          <input type="file" accept=".csv" style={{display: "none"}} {...register("taskFile")} />
        </Button>
        <Typography sx={{textAlign: "center"}}>{taskFile && taskFile[0].name || "No file chosen"}</Typography>
        <Button type="submit" variant="contained">Create</Button>
      </Box>
    </form>
    
  )
}

export default NewSequenceForm
