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
  after,
  page = 1,
  perPage = 50,
  enabled = true,
}: AthleteActivitiesProps) => {
  const { tokenInfo } = useStravaAuth()

  const date = new Date()
  date.setMonth(date.getMonth() - 1)
  const oneMonthAgo = date.getTime() / 1000

  const since = after ?? oneMonthAgo

  return useQuery({
    queryKey: ['athlete-activities', page, perPage],
    enabled: enabled,
    queryFn: () =>
      fetchData<ActivitiesSummary>(
        `/athlete/activities?after=${since}&page=${page}&perPage=${perPage}`,
        tokenInfo!.access_token
      ),
  })
}
