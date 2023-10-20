import Typography from "@mui/material/Typography";
import { Athlete } from "./types";
import { SxProps, Theme } from "@mui/material/styles";
import { useTranslation } from 'react-i18next';

interface UserNameProps {
  athlete: Athlete;
  sx?: SxProps<Theme>
}

export const UserName = ({ athlete, ...otherProps }: UserNameProps) => {
  const { t } = useTranslation('common', {keyPrefix: 'username'});
  return <Typography variant="h3" {...otherProps}>{t('hi', {name: athlete.firstname})}</Typography>;
};
