import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";

export const ChangeLanguage = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Box sx={{ ml: "auto" }}>
          <IconButton onClick={() => changeLanguage("fr")}>
            <ReactCountryFlag countryCode="FR" />
          </IconButton>
          <IconButton>
            <ReactCountryFlag
              countryCode="GB"
              onClick={() => changeLanguage("en")}
            />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
