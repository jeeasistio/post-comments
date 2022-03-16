import { createTheme, responsiveFontSizes } from '@mui/material'

const theme = createTheme({
  palette: {
    background: {
      paper: '#fcfcfc'
    }
  },
  typography: {
    fontSize: 16,
    fontFamily: 'Lato'
  }
})

export default responsiveFontSizes(theme)
