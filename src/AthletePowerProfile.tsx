import Box from '@mui/material/Box'
import { SxProps } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'
import { useAthleteActivities } from './api/useAthleteActivities'
import { AthleteBestEfforts } from './AthleteBestEfforts'
import Typography from '@mui/material/Typography'

interface AthletePowerProfileProps {
  sx?: SxProps
}

export const AthletePowerProfile = ({ sx }: AthletePowerProfileProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'athlete-power-profile' })

  const { data: athleteActivitiesPage1, isLoading } = useAthleteActivities({
    perPage: 50,
    page: 1,
  })

  if (isLoading)
    return (
      <Box sx={sx}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-evenly"
        >
          <CircularProgress />
        </Stack>
      </Box>
    )

  const activityTypes = ['Ride', 'VirtualRide']

  const allBikeActivitiesIds = [
    ...(athleteActivitiesPage1?.response
      ?.filter((a) => activityTypes.includes(a.type))
      .map((a) => a.id) || []),
  ]

  return (
    <Box sx={sx}>
      <Typography variant="h3">{t('title')}</Typography>
      <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
        {'Grimpeur'}
      </Typography>

      <AthleteBestEfforts ids={allBikeActivitiesIds}></AthleteBestEfforts>
    </Box>
  )
}
