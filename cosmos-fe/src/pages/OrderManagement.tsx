import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FormEvent, useEffect, useState } from "react";
import { createOrder, getOrders } from "../services/orderServices";
import { FloatLabel } from "primereact/floatlabel";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useMutation, useQuery } from "@tanstack/react-query";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { Tag } from "primereact/tag";
const OrderManagement = () => {
  const [customerId, setCustomerId] = useState<string>("");
  const [productId, setProductId] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [orders, setOrders] = useState<any>([]);
  const [nodes, setNodes] = useState([]);

  const { data: customers } = useQuery({
    queryKey: ["customer"],
    queryFn: getOrders,
  });

  const { data: ordersData } = useMutation({
    mutationFn: createOrder,
  });
  useEffect(() => {
    setNodes(orders);
  }, [orders]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const order = {
      customerId,
      items: [
        {
          productId,
          price,
          quantity,
        },
      ],
    };
    createOrder(order);
  };
  const statusBodyTemplate = (product:any) => {
    return (
      <Tag
        value={product.status}
        severity={getSeverity(product) || 'info'}
      ></Tag>
    );
  };

  const getSeverity = (product:any) => {
    switch (product.status) {
      case "SHIPPING":
        return 'info';

      case "DELIVERED":
        return 'success';

      case "CANCELLED":
        return 'danger';

      case "PENDING":
        return 'warning';

      default:
        return "info";
    }
  };

  const renderActions = () => (
    <div className="flex gap-2">
      <Button severity="warning" className="flex gap-1 justify-center">
        Edit <MdEdit />
      </Button>
      <Button severity="danger" className="flex gap-1 justify-center">
        Delete <RiDeleteBin7Fill />{" "}
      </Button>
    </div>
  );
  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        background: `
          linear-gradient(to right, rgba(0,0,0,0), teal), 
          linear-gradient(to right, rgba(255,0,100,.3), rgba(255,100,127,.2)), 
          linear-gradient(to top right, yellow, rgba(0,0,0,0)), 
          radial-gradient(closest-corner at 20% 80%, yellow, red)`,
        backgroundAttachment: "fixed",
      }}
    >
      <h1 className="text-5xl mt-10 mx-auto text-white">Order Management</h1>
      <h2 className="mx-auto text-white">Create Order</h2>
      <form
        className="flex flex-col  gap-10 mt-10 mx-auto"
        onSubmit={handleSubmit}
      >
        <FloatLabel>
          <label htmlFor="customerId">Customer Id</label>
          <InputText
            value={customerId?.toString()}
            onChange={(e) => setCustomerId(e.target.value)}
            id="customerId"
          ></InputText>
        </FloatLabel>

        <FloatLabel>
          <label htmlFor="productId">Product Id</label>
          <InputText
            value={productId?.toString()}
            onChange={(e) => setProductId(e.target.value)}
            id="productId"
          ></InputText>
        </FloatLabel>

        <FloatLabel>
          <label htmlFor="price">Price</label>
          <InputText
            value={price?.toString()}
            onChange={(e) => setPrice(e.target.value)}
            id="price"
          ></InputText>
        </FloatLabel>
        <FloatLabel>
          <label htmlFor="quantity">Quantity</label>
          <InputText
            value={quantity?.toString()}
            onChange={(e) => setQuantity(e.target.value)}
            id="quantity"
          ></InputText>
        </FloatLabel>

        <Button label="Submit" />
      </form>
      <h2 className="text-3xl mx-auto text-white mt-20">Orders</h2>

      <div className="card mt-10 mx-10">
        <DataTable value={customers?.data} tableStyle={{ minWidth: "10rem" }}>
          <Column field="id" header="ID"></Column>
          <Column field="customerId" header="Customer ID"></Column>
          <Column field="createdAt" header="Created At"></Column>
          <Column
            field="status"
            header="Status"
            body={statusBodyTemplate}
          ></Column>
          <Column
            field="actions"
            header="Actions"
            body={renderActions}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default OrderManagement;
