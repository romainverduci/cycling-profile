import Avatar from '@mui/material/Avatar'
import { UserName } from './UserName'
import Box from '@mui/material/Box'
import { useStravaAuth } from './StravaAuthProvider'
import { AthleteYearlyStats } from './AthleteYearlyStats'
import { AthletePowerProfile } from './AthletePowerProfile'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'

export const UserPage = () => {
  const { user: athlete } = useStravaAuth()
  return (
    <Stack spacing={5}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Avatar
          sx={{ width: 125, height: 125, alignSelf: 'center' }}
          alt={athlete?.username}
          src={athlete?.profile}
        />
        <UserName sx={{ pt: 3 }} athlete={athlete!} />
      </Box>
      <Box sx={{ display: 'flex' }}>
        <AthletePowerProfile sx={{ width: '100%' }} />
        <Divider sx={{ py: 5 }} />
      </Box>
      <Box>
        <AthleteYearlyStats sx={{ width: '100%' }} />
      </Box>
    </Stack>
  )
}
