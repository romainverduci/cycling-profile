import { useMemo } from 'react'
import { useStravaAuth } from './StravaAuthProvider'
import { useAthleteStats } from './api/useAthleteStats'
import { Box, Skeleton, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import LandscapeOutlinedIcon from '@mui/icons-material/LandscapeOutlined'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import DirectionsBikeOutlinedIcon from '@mui/icons-material/DirectionsBikeOutlined'

export const AthleteStats = () => {
  const { t } = useTranslation('common', { keyPrefix: 'athlete-stats' })

  const { user } = useStravaAuth()
  const { data: athleteStats, isLoading } = useAthleteStats({ id: user!.id })

  const distanceInKm = useMemo(
    () => Math.round((athleteStats?.ytd_ride_totals.distance ?? 0) / 1000),
    [athleteStats?.ytd_ride_totals.distance]
  )

  const elevation = useMemo(
    () => athleteStats?.ytd_ride_totals.elevation_gain,
    [athleteStats?.ytd_ride_totals.elevation_gain]
  )

  const time = useMemo(
    () => Math.round((athleteStats?.ytd_ride_totals.moving_time ?? 0) / 3660),
    [athleteStats?.ytd_ride_totals.moving_time]
  )

  if (isLoading)
    return (
      <Box sx={{ mt: 14, width: '100%' }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-evenly"
        >
          <Skeleton width={100} height={30} />
          <Skeleton width={100} height={30} />
          <Skeleton width={100} height={30} />
        </Stack>
      </Box>
    )

  return (
    <Box sx={{ mt: 14 }}>
      <Typography variant="h3">{t('title')}</Typography>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-evenly"
        sx={{ py: 5 }}
      >
        <Box>
          <Stack direction="row" alignItems="center" spacing={1}>
            <DirectionsBikeOutlinedIcon fontSize="large" />
            <Typography variant="h4">
              {t('total-distance', {
                number: distanceInKm,
              })}
            </Typography>
          </Stack>
        </Box>
        <Box>
          <Stack direction="row" alignItems="center" spacing={1}>
            <LandscapeOutlinedIcon fontSize="large" />
            <Typography variant="h4">
              {t('total-elevation', {
                number: elevation,
              })}
            </Typography>
          </Stack>
        </Box>
        <Box>
          <Stack direction="row" alignItems="center" spacing={1}>
            <AccessTimeOutlinedIcon fontSize="large" />
            <Typography variant="h4">
              {t('total-time', {
                number: time,
              })}
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}
