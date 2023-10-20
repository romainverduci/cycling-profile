import Container from "@mui/material/Container";
import { ChangeLanguage } from "./ChangeLanguage";
import Box from "@mui/material/Box";

interface LayoutProps {
  children?: React.ReactNode | React.ReactNode[];
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Container sx={{ minHeight: "100vh" }}>
      <ChangeLanguage />
      <Box sx={{ p: 8 }}>{children}</Box>
    </Container>
  );
};
