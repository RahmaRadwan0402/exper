import Cookies from "universal-cookie";
import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { User } from "../Context/Usercontext";
import LoadingPage from "../../components/website/LoadingPage";
import axios from "axios";

export default function PersistLogin() {
  // Get current User
  const context = useContext(User);
  const token = context.auth.token;
  const [loading, setLoading] = useState(true);

  // cookie
  const cookie = new Cookies();

  useEffect(() => {
    async function refresh() {
      try {
        const authData = cookie.get("authData");
        if (!authData) {
          setLoading(false);
          return;
        }
        const { data } = await axios.post(
          `http://127.0.0.1:8000/api/refresh`,
          null,
          {
            headers: {
              Authorization: "Bearer " + authData.token,
            },
          }
        );
        cookie.set("authData", {
          userDetails: data?.user,
          token: data?.token,
        });
        context.setAuth((prev) => {
          return { userDetails: data.user, token: data.token };
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    if (!token) {
      refresh();
    } else {
      setLoading(false);
    }
  }, [token, context]);

  return loading ? <LoadingPage /> : <Outlet />;
}
