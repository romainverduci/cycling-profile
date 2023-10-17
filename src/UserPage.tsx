/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserName } from "./UserName";

export const UserPage = ({ athlete }: { athlete: any }) => {
  return (
    <>
      <img src={athlete?.profile_medium} />
      <UserName athlete={athlete!} />
    </>
  );
};
