import {createTheme} from '@mui/material'
import Signin from './screens/Signin'

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
    <div><Signin/></div>
  )
}

export default App