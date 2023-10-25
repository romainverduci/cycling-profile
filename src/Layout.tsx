import Container from '@mui/material/Container'
import { AppBar } from './AppBar'
import Box from '@mui/material/Box'

interface LayoutProps {
  children?: React.ReactNode | React.ReactNode[]
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Container sx={{ minHeight: '100vh' }}>
      <AppBar />
      <Box sx={{ p: 8 }}>{children}</Box>
    </Container>
  )
}
