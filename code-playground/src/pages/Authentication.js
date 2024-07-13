import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
export default function Authentication() {
  const navigate = useNavigate();
  const userAuth = false;

  useEffect(() => {
    if (!userAuth) {
      navigate("/login");
    }
  }, []);
  return <Outlet />;
}
