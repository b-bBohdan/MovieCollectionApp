import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";

export default function RootLayout() {
  const { fetchUser } = useUser();
  const location = useLocation();

  useEffect(() => {
    //     const shouldFetchUser =
    //   location.pathname === "/" ||
    //   location.pathname === "/login" ||
    //   location.pathname === "/dashboard"; // Add others if needed

    // if (shouldFetchUser) {
    //   fetchUser();}
    fetchUser();
  }, [location.pathname]);

  return (
    <>
      <Header />

      <Outlet></Outlet>
    </>
  );
}
