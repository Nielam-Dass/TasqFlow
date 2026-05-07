import type { JSX } from "react"
import { createBrowserRouter, Outlet, RouterProvider, ScrollRestoration } from "react-router"
import SequencePage from "./pages/sequence/SequencePage"
import ProcessPage from "./pages/process/ProcessPage"
import TasqUserDataProvider from "./components/TasqUserData"
import HomePage from "./pages/home/HomePage"
import { createTheme, ThemeProvider } from "@mui/material"
import { teal } from "@mui/material/colors"
import MainAppBar from "./components/MainAppBar"


const browserRouter = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [
      {
        index: true,
        Component: HomePage
      },
      {
        path: "/sequence/:seqId",
        Component: SequencePage
      },
      {
        path: "/process/:procId",
        Component: ProcessPage
      }
    ]
  }
])

const theme = createTheme({
  palette: {
    primary: teal
  },
  typography: {
    fontFamily: "Arial"
  }
})

/**
 * Defines app layout
 * 
 * @returns JSX element for app layout
 */
function AppLayout(): JSX.Element {
  return (
    <>
      <ScrollRestoration/>
      <ThemeProvider theme={theme}>
        <MainAppBar/>
        <TasqUserDataProvider>
          <Outlet/>
        </TasqUserDataProvider>
      </ThemeProvider>
    </>
  )
}

/**
 * Main App component
 * 
 * @returns JSX element for the App component
 */
function App(): JSX.Element {
  return (
    <>
      <RouterProvider router={browserRouter} />
    </>
  )
}

export default App
