import { Menubar } from "primereact/menubar";
import { useNavigate } from "react-router-dom";

export function MainMenu() {
  const navigate = useNavigate();
  const items = [
    {
      label: "Home",
      icon: "pi pi-home",
      command: () => navigate("/"),
    },
    {
      label: "Order Management",
      icon: "pi pi-star",
      command: () => navigate("/order-management"),
    },
    {
      label: "Customer Management",
      icon: "pi pi-search",
      command: () => navigate("/customer-management"),
    },
    {
      label: "Product Management",
      icon:"",
      command: () => navigate("/product-management"),
    }
  ];

  return (
    <div className="card bg-slate-400">
      <Menubar model={items} className="bg-slate-400"/>
    </div>
  );
}
