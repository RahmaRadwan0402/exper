import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { User } from "../Context/Usercontext";

export default function RequireAuth() {
  const user = useContext(User);
  const location = useLocation();
  return user.auth.userDetails ? (
    <Outlet />
  ) : (
    <Navigate state={{ from: location }} replace to="/login" />
  );
}
