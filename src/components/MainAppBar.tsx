import { AppBar, Toolbar, Typography } from '@mui/material'


function MainAppBar() {
  return (
    <>
    <AppBar>
        <Toolbar sx={{p: 1}}>
        <Typography variant="h2" sx={{flexGrow: 1}}>TasqFlow</Typography>
        <Typography variant="h4">Developed by Niel</Typography>
        </Toolbar>
    </AppBar>
    <Toolbar sx={{p: 1, mb: 2}}/>
    </>
  )
}

export default MainAppBar
