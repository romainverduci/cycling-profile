import { extractCogganPowerData } from './extractCogganPowerData'
import { mockedPowerStreams } from './mockedPowerStreams'

describe('extractCogganPowerData', () => {
  test('should return expected best power data', () => {
    const expectedCoggan = { 1: 615, 5: 518, 60: 320, 300: 262, 1200: 244 }
    expect(extractCogganPowerData(mockedPowerStreams)).toStrictEqual(
      expectedCoggan
    )
  })
})
