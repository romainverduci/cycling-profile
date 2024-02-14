/* eslint-disable @typescript-eslint/no-explicit-any */
interface FetchDataProps {
  url: string
  token: string
  provider?: 'wahoo'
  queryId?: string
  body?: any
}

export const fetchData = async <T>({
  url,
  token,
  provider,
  queryId,
  body,
}: FetchDataProps) => {
  const baseUri =
    provider === 'wahoo' ? 'api.wahooligan.com/v1' : '/www.strava.com/api/v3'

  const response = await fetch(`https://${baseUri}${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })
  // Add queryId to the response (this is done to add the activity id as Strava does not include it in the response when getting some activity data)
  return response
    .json()
    .then((data) => ({ response: data as T, queryId: queryId }))
}
