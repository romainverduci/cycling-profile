import Box from '@mui/material/Box'
import { SxProps } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'
import { useAthleteActivities } from './api/useAthleteActivities'
import { ActivitiesPowerStream } from './ActivitiesPowerStream'

interface AthletePowerProfileProps {
  sx?: SxProps
}

export const AthletePowerProfile = ({ sx }: AthletePowerProfileProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'athlete-power-profile' })

  //const { data: athleteZones, isLoading } = useAthleteZones()
  const { data: athleteActivitiesPage1, isLoading } = useAthleteActivities({
    perPage: 50,
    page: 1,
  })
  /* const { data: athleteActivitiesPage2, isLoading: isLoadingPage2 } =
    useAthleteActivities({
      perPage: 50,
      page: 2,
      enabled:
        !!athleteActivitiesPage1 &&
        athleteActivitiesPage1.response?.length === 50,
    })
     const { data: athleteActivitiesPage3, isLoading: isLoadingPage3 } =
    useAthleteActivities({
      perPage: 50,
      page: 3,
      enabled:
        !!athleteActivitiesPage2 &&
        athleteActivitiesPage2.response?.length === 50,
    })
  const { data: athleteActivitiesPage4, isLoading: isLoadingPage4 } =
    useAthleteActivities({
      perPage: 50,
      page: 4,
      enabled:
        !!athleteActivitiesPage3 &&
        athleteActivitiesPage3.response?.length === 50,
    })
  const { data: athleteActivitiesPage5, isLoading: isLoadingPage5 } =
    useAthleteActivities({
      perPage: 50,
      page: 5,
      enabled:
        !!athleteActivitiesPage4 &&
        athleteActivitiesPage4.response?.length === 50,
    })
  const { data: athleteActivitiesPage6, isLoading: isLoadingPage6 } =
    useAthleteActivities({
      perPage: 50,
      page: 6,
      enabled:
        !!athleteActivitiesPage5 &&
        athleteActivitiesPage5.response?.length === 50,
    }) */

  if (
    isLoading /* || 
(isLoadingPage2 && athleteActivitiesPage1?.response?.length === 50) ||
    (isLoadingPage3 && athleteActivitiesPage2?.response?.length === 50) ||
    (isLoadingPage4 && athleteActivitiesPage3?.response?.length === 50) ||
    (isLoadingPage5 && athleteActivitiesPage4?.response?.length === 50) ||
    (isLoadingPage6 && athleteActivitiesPage5?.response?.length === 50) */
  )
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
    /* ...(athleteActivitiesPage2?.response
      ?.filter((a) => a.type === 'Ride')
      .map((a) => a.id) || []),
        ...(athleteActivitiesPage3?.response
      ?.filter((a) => a.type === 'Ride')
      .map((a) => a.id) || []),
    ...(athleteActivitiesPage4?.response
      ?.filter((a) => a.type === 'Ride')
      .map((a) => a.id) || []),
    ...(athleteActivitiesPage5?.response
      ?.filter((a) => a.type === 'Ride')
      .map((a) => a.id) || []),
    ...(athleteActivitiesPage6?.response
      ?.filter((a) => a.type === 'Ride')
      .map((a) => a.id) || []), */
  ]

  console.log(allBikeActivitiesIds)

  return (
    <Box sx={sx}>
      <ActivitiesPowerStream ids={allBikeActivitiesIds}></ActivitiesPowerStream>
    </Box>
  )
}
