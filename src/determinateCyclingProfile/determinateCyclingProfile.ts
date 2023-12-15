export enum CYCLING_PROFILE {
  ALL_ROUNDER = 'all-rounder',
  TIME_TRIALIST = 'time-trialist',
  SPRINTER = 'sprinter',
  PUNCHER = 'puncher',
}

interface Scores {
  sprinter: number
  puncher: number
  'time-trialist': number
  'all-rounder': number
}

interface PowerProfile {
  5: number
  60: number
  300: number
  1200: number
}

export const determinateCyclingProfile = (powerProfile: PowerProfile) => {
  // Calculate scores for each category based on the most important power duration
  const scores: Scores = {
    sprinter: powerProfile[5],
    puncher: (powerProfile[60] + powerProfile[300]) / 2,
    'time-trialist': powerProfile[1200],
    'all-rounder':
      (powerProfile[5] +
        powerProfile[60] +
        powerProfile[300] +
        powerProfile[1200]) /
      4,
  }

  // Trouver le profil le plus élevé
  const categorieMax = Object.keys(scores).reduce((a, b) =>
    scores[a as keyof Scores] > scores[b as keyof Scores] ? a : b
  )

  return categorieMax
}
