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

const CLIENT_ID = import.meta.env.VITE_WAHOO_CLIENT_ID
const CLIENT_SECRET = import.meta.env.VITE_WAHOO_CLIENT_SECRET
const AUTHORIZATION_URL = import.meta.env.VITE_WAHOO_AUTHORIZATION_URL
const REDIRECT_URI = import.meta.env.VITE_WAHOO_REDIRECT_URI

interface TokenInfo {
  access_token: string
  expires_at: number
  expires_in: number
  refresh_token: string
  token_type: 'Bearer'
}

interface AuthContextType {
  loggedIn: boolean
  user?: Athlete
  tokenInfo?: TokenInfo
  logout?: () => void
}

export const AuthContext = createContext<AuthContextType>({
  loggedIn: false,
})

interface WahooAuthProviderProps {
  children: ReactNode | ReactNode[]
}

export const WahooAuthProvider = ({ children }: WahooAuthProviderProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'login-page' })

  const [user, setUser, unsetUser] = useLocalStorage('user', undefined)

  const [tokenInfo, setTokenInfo, unsetTokenInfo] = useLocalStorage(
    'tokenInfo',
    undefined
  )
  const [loggedIn, setLoggedIn] = useState(false)
  const [error, setError] = useState(null)

  const onSuccess = ({ code }: { code: number }) =>
    fetch(
      `https://api.wahooligan.com/oauth/token?client_secret=${CLIENT_SECRET}&code=${code}&redirect_uri=${REDIRECT_URI}&grant_type=authorization_code&client_id=${CLIENT_ID}`,
      {
        method: 'POST',
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setTokenInfo(data)
        setLoggedIn(true)
        fetchUser(data.access_token)
      })
      .catch(setError)

  const fetchUser = (token: string) => {
    fetch(`https://api.wahooligan.com/v1/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) =>
        setUser({
          firstname: data.first,
          lastname: data.last,
          weight: data.weight,
        })
      )
  }

  const onFailure = (response: any) => console.error(response)

  const checkTokenExpiry = () => {
    //const expiresAt = tokenInfo?.expires_in * 1000 // Strava token expires_at is in seconds
    const now = new Date().getTime()
    if (tokenInfo && tokenInfo.created_at + tokenInfo.expires_in > now) {
      logout()
    }
  }

  const logout = () => {
    unsetUser()
    unsetTokenInfo()
    setLoggedIn(false)
  }

  useEffect(() => {
    const isLoggedIn = !!user
    setLoggedIn(isLoggedIn)
    checkTokenExpiry()
  }, [user])

  if (error) {
    return <div className="ErrorAlert">{error && (error as any).message}</div>
  }

  if (!loggedIn) {
    return (
      <OAuth2Login
        authorizationUrl={AUTHORIZATION_URL}
        responseType="code"
        clientId={CLIENT_ID || ''}
        redirectUri={REDIRECT_URI}
        scope="workouts_read%20power_zones_read%20user_read"
        onSuccess={(code: any) => onSuccess(code)}
        onFailure={onFailure}
        render={(props) => (
          <Button onClick={props.onClick}>{t('connect-your-wahoo')}</Button>
        )}
      />
    )
  }

  return (
    <AuthContext.Provider value={{ loggedIn, user, tokenInfo, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
