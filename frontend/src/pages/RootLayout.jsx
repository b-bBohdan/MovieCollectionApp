import { useLocation, useNavigation } from "react-router-dom";
import Header from "../components/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";

export default function RootLayout() {
  const { fetchUser } = useUser();
  const location = useLocation();
  const navigation = useNavigation();
  console.log(navigation.state);

  useEffect(() => {
    //     const shouldFetchUser =
    //   location.pathname === "/" ||
    //   location.pathname === "/login" ||
    //   location.pathname === "/dashboard"; // Add others if needed

    if (navigation.state === "idle") {
      fetchUser();
    }
  }, [navigation.state]);

  return (
    <>
      <Header />

      <Outlet></Outlet>
    </>
  );
}
