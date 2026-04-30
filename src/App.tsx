import type { JSX } from "react"
import { createBrowserRouter, Outlet, RouterProvider } from "react-router"
import SequencePage from "./pages/sequence/SequencePage"
import ProcessPage from "./pages/process/ProcessPage"
import TasqUserDataProvider from "./components/TasqUserData"
import HomePage from "./pages/home/HomePage"
import { AppBar, createTheme, ThemeProvider, Toolbar, Typography } from "@mui/material"
import { teal } from "@mui/material/colors"


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
      <ThemeProvider theme={theme}>
        <AppBar>
          <Toolbar sx={{p: 1}}>
            <Typography variant="h2" sx={{flexGrow: 1}}>TasqFlow</Typography>
            <Typography variant="h4">Developed by Niel</Typography>
          </Toolbar>
        </AppBar>
        <Toolbar sx={{p: 1}}/>
        
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
