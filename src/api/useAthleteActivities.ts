import { useQuery } from '@tanstack/react-query'
import { useStravaAuth } from '../StravaAuthProvider'
import { fetchData } from './fetch'
import { ActivitiesSummary } from '../types'
import { useAuth } from '../WahooAuthProvider'

interface AthleteActivitiesProps {
  after?: number
  page?: number
  perPage?: number
  enabled?: boolean
  provider?: 'wahoo'
}

export const useAthleteActivities = ({
  page = 1,
  perPage = 50,
  enabled = true,
  provider,
}: AthleteActivitiesProps) => {
  const { tokenInfo } = useAuth()

  /*   const date = new Date()
  date.setMonth(date.getMonth() - 6)
  const sixMonthsAgo = date.getTime() / 1000 */

  const url = provider === 'wahoo' ? '/workouts' : '/athlete/activities'

  return useQuery({
    queryKey: ['athlete-activities', page, perPage],
    enabled: enabled,
    queryFn: () =>
      fetchData<ActivitiesSummary>({
        url: `${url}?page=${page}&per_page=${perPage}`,
        token: tokenInfo!.access_token,
        provider,
      }),
  })
}
