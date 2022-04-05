import { createContext } from "react";

export const roles = {
  guest: "guest",
  user: "user",
  admin: "admin",
};

const UserContext = createContext({
  name: "anon",
  email: "anon@musk.com",
  role: roles.guest,
});

export default UserContext;
