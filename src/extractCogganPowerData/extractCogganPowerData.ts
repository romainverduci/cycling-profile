import { StreamSet } from '../types'

export const extractCogganPowerData = (powerStreams: StreamSet) => {
  const powerStream = powerStreams.find((pw) => pw.type === 'watts')?.data || []

  const oneSecondBest = bestPowerForTime(powerStream, 1)
  const fiveSecondsBest = bestPowerForTime(powerStream, 5)
  const OneMinuteBest = bestPowerForTime(powerStream, 60)
  const fiveMinutesBest = bestPowerForTime(powerStream, 300)
  const twentyMinutesBest = bestPowerForTime(powerStream, 1200)

  return {
    1: oneSecondBest,
    5: fiveSecondsBest,
    60: OneMinuteBest,
    300: fiveMinutesBest,
    1200: twentyMinutesBest,
  }
}

const bestPowerForTime = (data: number[], seconds: number) => {
  return data.reduce((acc: number, _valueAtIndex: number, index: number) => {
    // For each point in the stream that represent the power at a given second, calculate the average of the next ${seconds} seconds, keep the higher number and proceed next
    const averageAtIndex = Math.round(
      data.slice(index, index + seconds).reduce((a, b) => a + b, 0) / seconds
    )
    return averageAtIndex > acc ? averageAtIndex : acc
  }, 0)
}
