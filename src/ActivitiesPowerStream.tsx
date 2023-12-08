import { Box, CircularProgress, Stack, Typography } from '@mui/material'
import { useActivitiesPowerStream } from './api/useActivitiesPowerStream'
import { useLocalStorage } from './useLocalStorage'
import { extractCogganPowerData } from './extractCogganPowerData/extractCogganPowerData'
import { useTranslation } from 'react-i18next'

export const ActivitiesPowerStream = ({ ids }: { ids: number[] }) => {
  const { t } = useTranslation('common', { keyPrefix: 'athlete-power-profile' })

  const [athletePowerData, setAthletePowerData] = useLocalStorage(
    'athletePowerData',
    {}
  )

  const newIds = ids.filter(
    (id) => !Object.keys(athletePowerData).includes(`${id}`)
  )

  const results = useActivitiesPowerStream({ activitiesIds: newIds })

  if (results.some((r) => r.isLoading))
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-evenly">
        <CircularProgress />
      </Stack>
    </Box>

  results.map((r) => {
    const powerStream = r.data?.response?.find((d) => d.type === 'watts') || []
    // Thanks Strava for not including the activity id in the response :>
    const activityId = r.data?.queryId

    if (Object.keys(athletePowerData).length === 0)
      setAthletePowerData({ [`${activityId}`]: powerStream })
    else if (activityId && powerStream && !athletePowerData[activityId])
      setAthletePowerData({
        ...athletePowerData,
        [`${activityId}`]: powerStream,
      })
  })

  const bestCogganLastMonth = Object.keys(athletePowerData)
    .map((activityId) => extractCogganPowerData([athletePowerData[activityId]]))
    .reduce(
      (acc, current) => {
        const oneSecondBest = acc[1] > current[1] ? acc[1] : current[1]
        const fiveSecondsBest = acc[5] > current[5] ? acc[5] : current[5]
        const OneMinuteBest = acc[60] > current[60] ? acc[60] : current[60]
        const fiveMinutesBest =
          acc[300] > current[300] ? acc[300] : current[300]
        const twentyMinutesBest =
          acc[1200] > current[1200] ? acc[1200] : current[1200]

        return {
          1: oneSecondBest,
          5: fiveSecondsBest,
          60: OneMinuteBest,
          300: fiveMinutesBest,
          1200: twentyMinutesBest,
        }
      },
      { 1: 0, 5: 0, 60: 0, 300: 0, 1200: 0 }
    )

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-evenly"
        sx={{ width: '50%', mx: 'auto', pt: 5 }}
      >
        <Box sx={{ width: 50 }}>
          <Typography>1s</Typography>
        </Box>
        <Box sx={{ width: 50 }}>
          <Typography>5s</Typography>
        </Box>
        <Box sx={{ width: 50 }}>
          <Typography>1min</Typography>
        </Box>
        <Box sx={{ width: 50 }}>
          <Typography>5min</Typography>
        </Box>
        <Box sx={{ width: 50 }}>
          <Typography>20min</Typography>
        </Box>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-evenly"
        sx={{ width: '50%', mx: 'auto' }}
      >
        <Box sx={{ width: 50 }}>
          <Typography>{`${bestCogganLastMonth[1]}W`}</Typography>
        </Box>
        <Box sx={{ width: 50 }}>
          <Typography>{`${bestCogganLastMonth[5]}W`}</Typography>
        </Box>
        <Box sx={{ width: 50 }}>
          <Typography>{`${bestCogganLastMonth[60]}W`}</Typography>
        </Box>
        <Box sx={{ width: 50 }}>
          <Typography>{`${bestCogganLastMonth[300]}W`}</Typography>
        </Box>
        <Box sx={{ width: 50 }}>
          <Typography>{`${bestCogganLastMonth[1200]}W`}</Typography>
        </Box>
      </Stack>
    </>
  )
}
