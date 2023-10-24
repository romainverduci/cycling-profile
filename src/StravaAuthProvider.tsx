/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Athlete } from './types'
import OAuth2Login from 'react-simple-oauth2-login'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import { useLocalStorage } from './useLocalStorage'

const STRAVA_CLIENT_ID = import.meta.env.VITE_STRAVA_CLIENT_ID
const STRAVA_CLIENT_SECRET = import.meta.env.VITE_STRAVA_CLIENT_SECRET
const STRAVA_AUTHORIZATION_URL = import.meta.env.VITE_STRAVA_AUTHORIZATION_URL
const STRAVA_REDIRECT_URI = import.meta.env.VITE_STRAVA_REDIRECT_URI

interface StravaAuthContextType {
  loggedIn: boolean
  user?: Athlete
  token?: string
}

export const StravaAuthContext = createContext<StravaAuthContextType>({
  loggedIn: false,
})

interface StravaAuthProviderProps {
  children: ReactNode | ReactNode[]
}

export const StravaAuthProvider = ({ children }: StravaAuthProviderProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'login-page' })

  const [user, setUser] = useLocalStorage('user', undefined)
  const [token, setToken] = useLocalStorage('token', undefined)
  const [loggedIn, setLoggedIn] = useState(false)
  const [error, setError] = useState(null)

  const onSuccess = ({ code }: { code: number }) =>
    fetch(
      `https://www.strava.com/oauth/token?client_id=${STRAVA_CLIENT_ID}&client_secret=${STRAVA_CLIENT_SECRET}&code=${code}&grant_type=authorization_code`,
      {
        method: 'POST',
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setLoggedIn(true)
        setToken(data.access_token)
        setUser(data.athlete)
        return data.access_token
      })
      .catch(setError)
  const onFailure = (response: any) => console.error(response)

  useEffect(() => {
    setLoggedIn(user)
  }, [user])

  if (error) {
    return <div className="ErrorAlert">{error && (error as any).message}</div>
  }

  if (!loggedIn) {
    return (
      <OAuth2Login
        authorizationUrl={STRAVA_AUTHORIZATION_URL}
        responseType="code"
        clientId={STRAVA_CLIENT_ID || ''}
        redirectUri={STRAVA_REDIRECT_URI}
        scope="read"
        onSuccess={(code: any) => onSuccess(code)}
        onFailure={onFailure}
        render={(props) => (
          <Button onClick={props.onClick}>{t('connect-your-strava')}</Button>
        )}
      />
    )
  }

  return (
    <StravaAuthContext.Provider value={{ loggedIn, user, token }}>
      {children}
    </StravaAuthContext.Provider>
  )
}

export const useStravaAuth = () => useContext(StravaAuthContext)
