import {ThemeProvider, createTheme} from '@mui/material'
import Signin from './screens/Signin'
import Navbar from './components/Navbar'

const App = () => {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#FF5733',
      },
      secondary: {
        main: '#E0C2FF',
        light: '#F5EBFF',
        contrastText: '#47008F',
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <Navbar/>
    </ThemeProvider>
  )
}

export default App