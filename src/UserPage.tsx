import Avatar from '@mui/material/Avatar'
import { UserName } from './UserName'
import Box from '@mui/material/Box'
import { useStravaAuth } from './StravaAuthProvider'

export const UserPage = () => {
  const { user: athlete } = useStravaAuth()
  return (
    <Box display="flex" flexDirection="column">
      <Avatar
        sx={{ width: 125, height: 125, alignSelf: 'center' }}
        alt={athlete?.username}
        src={athlete?.profile}
      />
      <UserName sx={{ pt: 3 }} athlete={athlete!} />
    </Box>
  )
}
