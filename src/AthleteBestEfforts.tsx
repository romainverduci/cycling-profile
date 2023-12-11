import { Box, CircularProgress, Stack, Typography } from '@mui/material'
import { useActivitiesPowerStream } from './api/useActivitiesPowerStream'
import { useLocalStorage } from './useLocalStorage'
import { extractCogganPowerData } from './extractCogganPowerData/extractCogganPowerData'
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  Tick,
} from 'chart.js'
import { PolarArea } from 'react-chartjs-2'
import { useStravaAuth } from './StravaAuthProvider'

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend)

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

  const data = {
    labels: ['5s', '1min', '5min', '20min'],

    datasets: [
      {
        label: 'Performance index',

        data: [
          +(
            (bestEfforts[5] / (user?.weight || 1) / worldBestEffortsInWKg[5]) *
            100
          ).toFixed(1),
          +(
            (bestEfforts[60] /
              (user?.weight || 1) /
              worldBestEffortsInWKg[60]) *
            100
          ).toFixed(1),
          +(
            (bestEfforts[300] /
              (user?.weight || 1) /
              worldBestEffortsInWKg[300]) *
            100
          ).toFixed(1),
          +(
            (bestEfforts[1200] /
              (user?.weight || 1) /
              worldBestEffortsInWKg[1200]) *
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
          <Typography>{`${bestEfforts[1]} W`}</Typography>
        </Box>
        <Box sx={{ width: 50 }}>
          <Typography>{`${bestEfforts[5]} W`}</Typography>
        </Box>
        <Box sx={{ width: 50 }}>
          <Typography>{`${bestEfforts[60]} W`}</Typography>
        </Box>
        <Box sx={{ width: 50 }}>
          <Typography>{`${bestEfforts[300]} W`}</Typography>
        </Box>
        <Box sx={{ width: 50 }}>
          <Typography>{`${bestEfforts[1200]} W`}</Typography>
        </Box>
      </Stack>
      <Box width="100%" height="500px">
        <PolarArea
          width="500px"
          height="500px"
          data={data}
          options={{
            animation: { animateRotate: false, animateScale: true },
            plugins: { legend: { position: 'left' } },
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
    </>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const tickLabel = (value: number | string, _index: number, _ticks: Tick[]) => {
  const valueAsNumber = +value
  if (valueAsNumber <= 50) return 'poor'
  if (valueAsNumber > 50 && valueAsNumber <= 60) return 'fair'
  if (valueAsNumber > 60 && valueAsNumber <= 70) return 'good'
  if (valueAsNumber > 70 && valueAsNumber <= 80) return 'very good'
  if (valueAsNumber > 80) return 'exceptionnal'
}
