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
import { getSeverity, productPageBackground } from "../utils/common";
import { createProduct } from "../services/productService";
const ProductManagement = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [nodes, setNodes] = useState([]);

  const { data: customers } = useQuery({
    queryKey: ["customer"],
    queryFn: getOrders,
  });

  const { data: ordersData, mutate:productMutation } = useMutation({
    mutationFn: createProduct,
  });
  //   useEffect(() => {
  //     setNodes(orders);
  //   }, [orders]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const item = {
        name,
        price,
        quantity
      };
      productMutation(item);
    };
  const statusBodyTemplate = (product: any) => {
    return (
      <Tag
        value={product.status}
        severity={getSeverity(product) || "info"}
      ></Tag>
    );
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
    <div className="flex flex-col min-h-screen" style={productPageBackground}>
      <h1 className="text-5xl mt-10 mx-auto text-white">Product Management</h1>
      <h2 className="mx-auto text-white">Create Product</h2>
      <form
        className="flex flex-col  gap-10 mt-10 mx-auto"
        onSubmit={handleSubmit}
      >
        <FloatLabel>
          <label htmlFor="name">Name</label>
          <InputText
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
          ></InputText>
        </FloatLabel>
        <FloatLabel>
          <label htmlFor="price">Price</label>
          <InputText
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            id="price"
          ></InputText>
        </FloatLabel>
        <FloatLabel>
          <label htmlFor="quantity">Quantity</label>
          <InputText
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            id="quantity"
          ></InputText>
        </FloatLabel>

        <Button label="Submit" />
      </form>
      <h2 className="text-3xl mx-auto text-white mt-20">Products</h2>

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

export default ProductManagement;
