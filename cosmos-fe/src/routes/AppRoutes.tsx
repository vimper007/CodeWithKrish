import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import OrderManagement from "../pages/OrderManagement";
import Home from "../pages/Home";
import Layout from "../components/Layout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/order-management" element={<OrderManagement />}></Route>
        <Route></Route>
        <Route></Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
