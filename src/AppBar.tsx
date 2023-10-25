import Box from '@mui/material/Box'
import MuiAppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import ReactCountryFlag from 'react-country-flag'
import { useTranslation } from 'react-i18next'
import { useStravaAuth } from './StravaAuthProvider'

export const AppBar = () => {
  const { i18n, t } = useTranslation('common', { keyPrefix: 'appbar' })

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  const { logout } = useStravaAuth()

  return (
    <MuiAppBar position="fixed">
      <Toolbar>
        <Box sx={{ ml: 'auto' }}>
          <IconButton onClick={() => changeLanguage('fr')}>
            <ReactCountryFlag countryCode="FR" />
          </IconButton>
          <IconButton>
            <ReactCountryFlag
              countryCode="GB"
              onClick={() => changeLanguage('en')}
            />
          </IconButton>
          <Button onClick={logout}>{t('logout')}</Button>
        </Box>
      </Toolbar>
    </MuiAppBar>
  )
}
