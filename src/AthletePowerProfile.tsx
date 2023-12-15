import Box from '@mui/material/Box'
import { SxProps } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'
import { useAthleteActivities } from './api/useAthleteActivities'
import { AthleteBestEfforts } from './AthleteBestEfforts'

interface AthletePowerProfileProps {
  sx?: SxProps
}

export const AthletePowerProfile = ({ sx }: AthletePowerProfileProps) => {
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
      <AthleteBestEfforts ids={allBikeActivitiesIds}></AthleteBestEfforts>
    </Box>
  )
}
