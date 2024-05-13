import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Outlet, useNavigate } from "react-router-dom";

export default function ProtectedRoute() {
  const nav = useNavigate();
  let token = localStorage.getItem("_access-token");
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!token) {
      nav("/login");
    } else {
      checkAuth();
    }
  }, []);
  async function checkAuth() {
    setIsLoading(true);
    try {
      let response = await axios.get("/auth/me");
      console.log(response.data);
      setIsAuth(true);
      setIsLoading(false);
    } catch (error) {
      setIsAuth(false);
      setIsLoading(false);
      nav("/login");
      toast.error("Unauthorized", { id: "init_load" });
    }
  }
  return (
    <React.Fragment>
      {isAuth === true && isLoading === false ? (
        <Outlet />
      ) : (
        <div className="flex items-center justify-center w-full h-screen">Loading</div>
      )}
    </React.Fragment>
  );
}
