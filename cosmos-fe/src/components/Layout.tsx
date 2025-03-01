import React from "react";
import { MainMenu } from "./MainMenu";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <MainMenu />
      <Outlet />
    </div>
  );
};

export default Layout;
