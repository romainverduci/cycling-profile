import { Box, CircularProgress, Stack, Typography } from '@mui/material'
import { useActivitiesPowerStream } from './api/useActivitiesPowerStream'
import { useLocalStorage } from './useLocalStorage'
import { extractCogganPowerData } from './extractCogganPowerData/extractCogganPowerData'
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Tick,
} from 'chart.js'
import { PolarArea } from 'react-chartjs-2'
import { useStravaAuth } from './StravaAuthProvider'

ChartJS.register(RadialLinearScale, ArcElement, Tooltip)

const worldBestEffortsInWKg = {
  5: 24,
  60: 11.5,
  300: 7.6,
  1200: 6.4,
}

export const AthleteBestEfforts = ({ ids }: { ids: number[] }) => {
  const { user } = useStravaAuth()
  const [athletePowerData, setAthletePowerData] = useLocalStorage(
    'athletePowerData',
    {}
  )

  // Only get power streams for activities that are not stored in local storage
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

  const bestEfforts = Object.keys(athletePowerData)
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

  const bestEffortsInWKg = {
    1: bestEfforts[1] / (user?.weight || 1),
    5: bestEfforts[5] / (user?.weight || 1),
    60: bestEfforts[60] / (user?.weight || 1),
    300: bestEfforts[300] / (user?.weight || 1),
    1200: bestEfforts[1200] / (user?.weight || 1),
  }

  const data = {
    labels: ['5s', '1min', '5min', '20min'],

    datasets: [
      {
        label: 'Performance index',

        data: [
          +((bestEffortsInWKg[5] / worldBestEffortsInWKg[5]) * 100).toFixed(1),
          +((bestEffortsInWKg[60] / worldBestEffortsInWKg[60]) * 100).toFixed(
            1
          ),
          +((bestEffortsInWKg[300] / worldBestEffortsInWKg[300]) * 100).toFixed(
            1
          ),
          +(
            (bestEffortsInWKg[1200] / worldBestEffortsInWKg[1200]) *
            100
          ).toFixed(1),
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
        ],
        borderWidth: 1,
      },
    ],
  }

  return (
    <>
      <Box
        width="100%"
        height="500px"
        sx={{
          mt: 2,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <Box sx={{ my: 'auto' }}>
              <Typography variant="h6">20min</Typography>
              <Typography
                variant="h5"
                sx={{ fontWeight: 'bold' }}
              >{`${bestEfforts[1200]} W`}</Typography>
              <Typography
                sx={{ fontWeight: 'bold' }}
              >{`${worldBestEffortsInWKg[1200]} w/kg`}</Typography>
            </Box>
          </Box>
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <Box sx={{ my: 'auto' }}>
              <Typography variant="h6">5min</Typography>
              <Typography
                variant="h5"
                sx={{ fontWeight: 'bold' }}
              >{`${bestEfforts[300]} W`}</Typography>
              <Typography
                sx={{ fontWeight: 'bold' }}
              >{`${worldBestEffortsInWKg[300]} w/kg`}</Typography>
            </Box>
          </Box>
        </Box>
        <Box>
          <PolarArea
            width="500px"
            height="500px"
            data={data}
            options={{
              animation: { animateRotate: false, animateScale: true },
              plugins: { legend: { position: 'bottom' } },
              scales: {
                r: {
                  min: 0,
                  suggestedMax: 80,
                  ticks: {
                    z: 1,
                    stepSize: 20,
                    callback: tickLabel,
                    backdropPadding: 5,
                    font: { size: 14 },
                    major: { enabled: true },
                  },
                  grid: { color: 'grey' },
                },
              },
            }}
            style={{ marginLeft: 'auto', marginRight: 'auto' }}
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <Box sx={{ my: 'auto' }}>
              <Typography variant="h6">5s</Typography>
              <Typography
                variant="h5"
                sx={{ fontWeight: 'bold' }}
              >{`${bestEfforts[5]} W`}</Typography>
              <Typography
                sx={{ fontWeight: 'bold' }}
              >{`${worldBestEffortsInWKg[5]} w/kg`}</Typography>
            </Box>
          </Box>
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <Box sx={{ my: 'auto' }}>
              <Typography variant="h6">1min</Typography>
              <Typography
                variant="h5"
                sx={{ fontWeight: 'bold' }}
              >{`${bestEfforts[60]} W`}</Typography>
              <Typography
                sx={{ fontWeight: 'bold' }}
              >{`${worldBestEffortsInWKg[60]} w/kg`}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const tickLabel = (value: number | string, _index: number, _ticks: Tick[]) => {
  const valueAsNumber = +value
  if (valueAsNumber < 40) return 'modest'
  if (valueAsNumber >= 40 && valueAsNumber < 60) return 'fair'
  if (valueAsNumber >= 60 && valueAsNumber < 70) return 'good'
  if (valueAsNumber > 70 && valueAsNumber <= 80) return 'very good'
  if (valueAsNumber > 80) return 'exceptional'
}
