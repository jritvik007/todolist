import React from 'react'
import { createContext } from 'react'
import { useState } from 'react'
import { createTheme , ThemeProvider  } from '@mui/material/styles'

export const ThemeModeContext = createContext();

export const CustomThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('light')

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const theme= createTheme({
    palette: {
     mode:  mode,
    }
  })

  return (
    <ThemeModeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  )
}