/* eslint-disable @typescript-eslint/no-explicit-any */
export const fetchData = async <T>(
  url: string,
  token: string,
  queryId?: string,
  body?: any
) => {
  const response = await fetch(`https://www.strava.com/api/v3${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Authorization: Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })
  return response
    .json()
    .then((data) => ({ response: data as T, queryId: queryId }))
}
