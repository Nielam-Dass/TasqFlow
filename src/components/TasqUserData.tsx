import { createContext, useContext, useReducer, type JSX, type PropsWithChildren } from "react"
import type UserData from "../types/UserData"
import type Process from "../types/Process";


type Action = {
  actionType: string;
  payload: unknown;
}

const isProcessType = (payload: unknown): payload is Process => {
  return (
    typeof payload === "object" && 
    payload !== null && 
    "processId" in payload &&
    "processName" in payload &&
    "parentSequenceId" in payload &&
    "currentTaskIndex" in payload
  )
}

const reducer = (state: UserData, action: Action): UserData => {
  switch (action.actionType) {
    case "NEW-PROCESS":
      if (isProcessType(action.payload)) {
        const newProcess: Process = action.payload
        return {
          ...state, 
          processes: {
            ...state.processes, 
            [newProcess.processId]: newProcess
          }
        }
      }
      else {
        throw new Error("NEW-PROCESS actionType requires payload object of type Process")
      }
    default:
      return state
  }
}

type TasqUserDataProviderValue = [ UserData, (a: Action)=>void ]
const TasqUserDataContext = createContext<TasqUserDataProviderValue | null>(null)

function TasqUserDataProvider({ children }: PropsWithChildren): JSX.Element {
  const [userDataState, userDataDispatch] = useReducer<UserData, [Action]>(reducer, {
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
  })
  return (
    <TasqUserDataContext value={[userDataState, userDataDispatch]}>
      { children }
    </TasqUserDataContext>
  )
}

export function useTasqUserData(): TasqUserDataProviderValue {
  const context = useContext(TasqUserDataContext)
  if (!context) {
    throw new Error("useTaqUserData must be used within a TasqUserDataProvider")
  }
  return context
}

export default TasqUserDataProvider
