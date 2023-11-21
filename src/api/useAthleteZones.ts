import { useQuery } from '@tanstack/react-query'
import { useStravaAuth } from '../StravaAuthProvider'
import { fetchData } from './fetch'
import { AthleteZones } from '../types'

export const useAthleteZones = () => {
  const { tokenInfo } = useStravaAuth()

  return useQuery({
    queryKey: ['athlete-zones'],
    queryFn: () =>
      fetchData<AthleteZones>(`/athlete/zones`, tokenInfo!.access_token),
  })
}
