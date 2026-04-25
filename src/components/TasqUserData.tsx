import { createContext, useContext, useEffect, useReducer, type JSX, type PropsWithChildren } from "react"
import type UserData from "../types/UserData"
import type Process from "../types/Process";

/**
 * Gets user data from local storage
 * @param defaultData User data object to return if local storage is empty
 * @returns Current user data state
 */
const getSavedUserData = (defaultData: UserData): UserData => {
  const userDataJson = localStorage.getItem("tasq-user-data")
  if (userDataJson) return JSON.parse(userDataJson)
  return defaultData
}

/**
 * Typeguard function to determine if payload is a Process object
 * 
 * @param payload Uknown value to check
 * @returns Boolean depending on if payload is a Process
 */
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

type Action = {
  actionType: string;
  payload: unknown;
}

/**
 * Makes changes to user data based on specified action
 * 
 * @param state User data state
 * @param action Action to perform on state
 * @returns Updated user data state after action is performed
 */
const reducer = (state: UserData, action: Action): UserData => {
  switch (action.actionType) {
    case "UPDATE-PROCESS":
      if (isProcessType(action.payload) && state.processes[action.payload.processId]) {
        const updatedProcess: Process = action.payload
        return {
          ...state, 
          processes: {
            ...state.processes, 
            [updatedProcess.processId]: updatedProcess
          }
        }
      }
      else {
        throw new Error("UPDATE-PROCESS actionType requires payload of type Process with existing processId")
      }
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

/**
 * Provider component to share user data and action dispatch function with child elements
 * 
 * @param props Component props
 * @param props.children Child elements that access the context value
 * @returns JSX element for the user data provider component
 */
export default function TasqUserDataProvider({ children }: PropsWithChildren): JSX.Element {
  const [userDataState, userDataDispatch] = useReducer(reducer, {
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
  }, getSavedUserData)
  return (
    <TasqUserDataContext value={[userDataState, userDataDispatch]}>
      { children }
    </TasqUserDataContext>
  )
}

/**
 * Hook to get user data and a dispatch function from TasqUserDataProvider
 * 
 * @returns User data and a dispatch function, which can update the user data
 */
export function useTasqUserData(): TasqUserDataProviderValue {
  const context = useContext(TasqUserDataContext)
  if (!context) throw new Error("useTaqUserData must be used within a TasqUserDataProvider")

  const userData: UserData = context[0]
  useEffect(() => {
    localStorage.setItem("tasq-user-data", JSON.stringify(userData))
  }, [userData])
  
  return context
}
