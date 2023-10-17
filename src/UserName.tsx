import { Athlete } from "./types";

interface UserNameProps {
  athlete: Athlete;
}

export const UserName = ({ athlete }: UserNameProps) => {
  return <div>{athlete.username}</div>;
};
