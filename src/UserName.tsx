import Typography from "@mui/material/Typography";
import { Athlete } from "./types";
import { SxProps, Theme } from "@mui/material/styles";

interface UserNameProps {
  athlete: Athlete;
  sx?: SxProps<Theme>
}

export const UserName = ({ athlete, ...otherProps }: UserNameProps) => {
  return <Typography variant="h3" {...otherProps}>{`${athlete.firstname} ${athlete.lastname}`}</Typography>;
};
