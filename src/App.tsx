/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserPage } from "./UserPage";
import OAuth2Login from "react-simple-oauth2-login";
import { useState } from "react";
import { Button } from "@mui/material";
import { Layout } from "./Layout";
import { useTranslation } from "react-i18next";

const STRAVA_CLIENT_ID = import.meta.env.VITE_STRAVA_CLIENT_ID;
const STRAVA_CLIENT_SECRET = import.meta.env.VITE_STRAVA_CLIENT_SECRET;
const STRAVA_AUTHORIZATION_URL = import.meta.env.VITE_STRAVA_AUTHORIZATION_URL;
const STRAVA_REDIRECT_URI = import.meta.env.VITE_STRAVA_REDIRECT_URI;

function App() {
  const { t } = useTranslation("common", { keyPrefix: "login-page" });

  //const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const queryClient = new QueryClient();
  // You can test this with a GitHub OAuth2 app (provided test server supports GitHub and Spotify)
  const onSuccess = ({ code }: { code: any }) =>
    fetch(
      `https://www.strava.com/oauth/token?client_id=${STRAVA_CLIENT_ID}&client_secret=${STRAVA_CLIENT_SECRET}&code=${code}&grant_type=authorization_code`,
      {
        method: "POST",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        //setAccessToken(data.access_token);
        return data.access_token;
      })
      .then((token) =>
        fetch(`https://www.strava.com/api/v3/athlete`, {
          method: "GET",
          headers: {
            accept: "application/json",
            authorization: `Bearer ${token}`,
          },
        })
      )
      .then((res) => res.json())
      .then(setUser)
      .catch(setError);
  const onFailure = (response: any) => console.error(response);

  return (
    <>
      {error && (
        <div className="ErrorAlert">{error && (error as any).message}</div>
      )}
      {!user && (
        <OAuth2Login
          authorizationUrl={STRAVA_AUTHORIZATION_URL}
          responseType="code"
          clientId={STRAVA_CLIENT_ID || ""}
          redirectUri={STRAVA_REDIRECT_URI}
          scope="read"
          onSuccess={(code: any) => onSuccess(code)}
          onFailure={onFailure}
          render={(props) => (
            <Button onClick={props.onClick}>{t("connect-your-strava")}</Button>
          )}
        />
      )}

      {user && (
        <QueryClientProvider client={queryClient}>
          <Layout>
            <UserPage athlete={user} />
          </Layout>
        </QueryClientProvider>
      )}
    </>
  );
}

export default App;
