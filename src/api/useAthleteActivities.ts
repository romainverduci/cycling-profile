import { useQuery } from '@tanstack/react-query'
import { useStravaAuth } from '../StravaAuthProvider'
import { fetchData } from './fetch'
import { ActivitiesSummary } from '../types'

interface AthleteActivitiesProps {
  after?: number
  page?: number
  perPage?: number
  enabled?: boolean
}

export const useAthleteActivities = ({
  page = 1,
  perPage = 50,
  enabled = true,
}: AthleteActivitiesProps) => {
  const { tokenInfo } = useStravaAuth()

  /*   const date = new Date()
  date.setMonth(date.getMonth() - 6)
  const sixMonthsAgo = date.getTime() / 1000 */

  return useQuery({
    queryKey: ['athlete-activities', page, perPage],
    enabled: enabled,
    queryFn: () =>
      fetchData<ActivitiesSummary>(
        `/athlete/activities?page=${page}&per_page=${perPage}`,
        tokenInfo!.access_token
      ),
  })
}
