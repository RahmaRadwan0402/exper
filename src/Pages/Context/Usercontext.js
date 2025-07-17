import { createContext, useState } from "react";
import Cookies from "universal-cookie";
export const User = createContext({});


export default function UserProvider({ children }) {
  const cookie = new Cookies();

  const [auth, setAuth] = useState(() => {
    const authCookie = cookie.get("authData");
    try {
      return authCookie ? authCookie : {};
    } catch (e) {
      return {};
    }
  });

  return <User.Provider value={{ auth, setAuth }}>{children}</User.Provider>;
}
