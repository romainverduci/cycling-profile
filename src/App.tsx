import './App.css'
import { UserPage } from './UserPage'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { Layout } from './Layout'
import { StravaAuthProvider } from './StravaAuthProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { persistQueryClient } from '@tanstack/react-query-persist-client'

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: 1000 * 60 * 60 * 24, // 24 hours
      },
    },
  })

  const localStoragePersister = createSyncStoragePersister({
    storage: window.localStorage,
  })

  persistQueryClient({
    queryClient,
    persister: localStoragePersister,
  })

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
