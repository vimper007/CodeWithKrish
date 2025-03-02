import { Route, Routes } from "react-router-dom";
import OrderManagement from "../pages/OrderManagement";
import Home from "../pages/Home";
import Layout from "../components/Layout";
import CustomerManagement from "../pages/CutomerManagment"
import ProductManagement from "../pages/ProductManagement";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/order-management" element={<OrderManagement />}></Route>
        <Route path="/customer-management" element={<CustomerManagement/>}></Route>
        <Route path="/product-management" element={<ProductManagement/>}></Route>
        <Route></Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
