import React from "react";
import { MainMenu } from "./MainMenu";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div style={{ background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)" }} className="min-h-screen min-w-[768x]">
      <MainMenu />
      <Outlet />
    </div>
  );
};

export default Layout;
