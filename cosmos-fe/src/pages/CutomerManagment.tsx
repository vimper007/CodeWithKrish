import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { FormEvent, useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";


import { getOrders } from "../services/orderServices";
import { createCustomer, getCustomers } from "../services/customerService";

export const CutomerManagement = () => {
  const queryClient = useQueryClient()

  // React Query for getting all customers
  const { data: customerQueryData } = useQuery({
    queryKey: ["customer"],
    queryFn: getCustomers,
  });
  useEffect(() => {
    console.log('customerQueryData',customerQueryData)
  }, [customerQueryData])
  

  // React Query Mutation for creating a customer
  const {mutate: createCustomerMutation} = useMutation({
    mutationFn: createCustomer,
    onSuccess:()=>queryClient.invalidateQueries({queryKey:["cutomers"]})
  })

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
 

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
  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const customer = {
      name,
      email,
      address,
    }
    createCustomerMutation(customer)
  };
  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)",
      }}
      className="flex flex-col min-h-screen "
    >
      <h1 className="text-center text-5xl pt-10 text-white">
        Customer Management
      </h1>
      <h2 className="mx-auto text-white">Create Customer</h2>
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
          <label htmlFor="email">Email</label>
          <InputText
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
          ></InputText>
        </FloatLabel>

        <FloatLabel>
          <label htmlFor="address">Address</label>
          <InputText
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            id="address"
          ></InputText>
        </FloatLabel>

        <Button label="Submit" />
      </form>
      <h2 className="text-3xl mx-auto text-white mt-20">Customers</h2>
      <div className="card mt-10 mx-10">
        <DataTable value={customerQueryData?.data} tableStyle={{minWidth:"10rem"}}>
          <Column field="id" header="ID"></Column>
          <Column field="name" header="Customer Name"></Column>
          <Column field="email" header="Email"></Column>
          <Column field="address" header="Address"></Column>
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

export default CutomerManagement;
