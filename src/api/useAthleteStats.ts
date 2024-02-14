import { useQuery } from '@tanstack/react-query'
import { useStravaAuth } from '../StravaAuthProvider'
import { fetchData } from './fetch'
import { AthleteStats } from '../types'

export const useAthleteStats = ({ id }: { id: string }) => {
  const { tokenInfo } = useStravaAuth()

  return useQuery({
    queryKey: ['athlete-stats', id],
    queryFn: () =>
      fetchData<AthleteStats>({
        url: `/athletes/${id}/stats`,
        token: tokenInfo!.access_token,
      }),
  })
}
