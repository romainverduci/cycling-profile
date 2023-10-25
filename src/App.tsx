import './App.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { UserPage } from './UserPage'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { Layout } from './Layout'
import { StravaAuthProvider } from './StravaAuthProvider'

function App() {
  const queryClient = new QueryClient()

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  })

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline enableColorScheme />
      <StravaAuthProvider>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <UserPage />
          </Layout>
        </QueryClientProvider>
      </StravaAuthProvider>
    </ThemeProvider>
  )
}

export default App
