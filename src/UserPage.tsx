/* eslint-disable @typescript-eslint/no-explicit-any */
import Avatar from "@mui/material/Avatar";
import { UserName } from "./UserName";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

export const UserPage = ({ athlete }: { athlete: any }) => {
  return (
    <Container sx={{ minHeight: "100vh" }}>
      <Box display="flex" flexDirection='column'>
        <Avatar
          sx={{ width: 125, height: 125, alignSelf: 'center' }}
          alt={athlete?.username}
          src={athlete?.profile}
        />
        <UserName sx={{pt: 3}} athlete={athlete!} />
      </Box>
    </Container>
  );
};
