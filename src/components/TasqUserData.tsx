import { createContext, useContext, type JSX, type PropsWithChildren } from "react"
import type UserData from "../types/UserData"


const TasqUserDataContext = createContext<UserData | null>(null)

function TasqUserDataProvider({ children }: PropsWithChildren): JSX.Element {
  return (
    <TasqUserDataContext value={{
      sequences: {
        "AAA": {
          sequenceId: "AAA", 
          sequenceName: "Seq A", 
          tasks: [
            {taskId: "t1", taskName: "Task 1", isOptional: false},
            {taskId: "t2", taskName: "Task 2", isOptional: false},
            {taskId: "t3", taskName: "Task 3", isOptional: true},
            {taskId: "t4", taskName: "Task 4", isOptional: false},
          ]}
      }, 
      processes: {}
    }}>
      { children }
    </TasqUserDataContext>
  )
}

export function useTasqUserData() {
  const context = useContext(TasqUserDataContext)
  if (!context) {
    throw new Error("useTaqUserData must be used within a TasqUserDataProvider")
  }
  return context
}

export default TasqUserDataProvider
