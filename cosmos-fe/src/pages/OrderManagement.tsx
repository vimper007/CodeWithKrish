import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FormEvent, useEffect, useState } from "react";
import { createOrder, getOrders } from "../services/orderServices";
import { FloatLabel } from "primereact/floatlabel";
import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
const OrderManagement = () => {
  const [customerId, setCustomerId] = useState<string>("");
  const [productId, setProductId] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [orders, setOrders] = useState<any>([]);
  const [nodes, setNodes] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      const orders = await getOrders();
      if (orders) setOrders(orders);
      return;
    };
    fetchOrders();
  }, []);

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
  return (
    <>
      <div className="">
        <h1 className="text-2xl text-red-800">Order Management</h1>
        <h2 className="text-green-700">Create Order</h2>
        <form
          className="flex flex-col w-[30%] mx-auto gap-10"
          onSubmit={handleSubmit}
        >
          <FloatLabel>
            <label htmlFor="customerId">Customer Id</label>
            <InputText
              value={customerId?.toString()}
              onChange={(e) => setCustomerId(Number(e.target.value))}
              id="customerId"
            ></InputText>
          </FloatLabel>

          <FloatLabel>
            <label htmlFor="productId">Product Id</label>
            <InputText
              value={productId?.toString()}
              onChange={(e) => setProductId(Number(e.target.value))}
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
              onChange={(e) => setQuantity(Number(e.target.value))}
              id="quantity"
            ></InputText>
          </FloatLabel>

          <Button label="Submit" />
        </form>
      </div>
      <div className="card">
        <DataTable value={nodes.data} tableStyle={{ minWidth: "10rem" }}>
          <Column field="id" header="ID"></Column>
          <Column field="customerId" header="Customer ID"></Column>
          <Column field="createdAt" header="Created At"></Column>
          <Column field="status" header="Status"></Column>
        </DataTable>
      </div>
    </>
  );
};

export default OrderManagement;
