import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
import { createTheme, ThemeProvider } from '@mui/material/styles'
const theme = createTheme({})
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <App /></ThemeProvider>
  </React.StrictMode>,
)
