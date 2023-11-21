import { useQueries } from '@tanstack/react-query'
import { fetchData } from './fetch'
import { useStravaAuth } from '../StravaAuthProvider'
import { StreamSet } from '../types'
import { useMemo } from 'react'

interface ActivitiesPowerStreamProps {
  activitiesIds: number[]
}

export const useActivitiesPowerStream = ({
  activitiesIds,
}: ActivitiesPowerStreamProps) => {
  const { tokenInfo } = useStravaAuth()

  const queries = useMemo(
    () =>
      activitiesIds.map((id) => ({
        queryKey: ['activityPowerStreams', id],
        queryFn: () =>
          fetchData<StreamSet>(
            `/activities/${id}/streams?keys=watts`,
            tokenInfo!.access_token,
            `${id}`
          ),
        staleTime: Infinity,
      })),
    [activitiesIds, tokenInfo]
  )

  return useQueries({
    queries: queries,
  })
}
