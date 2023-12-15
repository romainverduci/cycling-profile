import {
  CYCLING_PROFILE,
  determinateCyclingProfile,
} from './determinateCyclingProfile'

describe('determinateCyclingProfile', () => {
  test.skip('should return expected cycling profile - all rounder', () => {
    const allRounder = { 5: 14, 60: 6, 300: 5, 1200: 4 }
    expect(determinateCyclingProfile(allRounder)).toStrictEqual(
      CYCLING_PROFILE.ALL_ROUNDER
    )
  })
})
