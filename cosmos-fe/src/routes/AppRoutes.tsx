import { Route, Routes } from "react-router-dom";
import OrderManagement from "../pages/OrderManagement";
import Home from "../pages/Home";
import Layout from "../components/Layout";
import Cutomers from "../pages/Cutomers";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/order-management" element={<OrderManagement />}></Route>
        <Route path="/customers" element={<Cutomers/>}></Route>
        <Route></Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
