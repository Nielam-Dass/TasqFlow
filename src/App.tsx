import type { JSX } from "react"
import { createBrowserRouter, Outlet, RouterProvider } from "react-router"
import SequencePage from "./pages/sequence/SequencePage"
import ProcessPage from "./pages/process/ProcessPage"
import TasqUserDataProvider from "./components/TasqUserData"


const browserRouter = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [
      {
        index: true,
        element: <div>Index Page</div>
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

/**
 * Defines app layout
 * 
 * @returns JSX element for app layout
 */
function AppLayout(): JSX.Element {
  return (
    <>
      <TasqUserDataProvider>
        <Outlet/>
      </TasqUserDataProvider>
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
      <h1>TasqFlow</h1>
      <RouterProvider router={browserRouter} />
    </>
  )
}

export default App
