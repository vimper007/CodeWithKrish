import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { getOrders } from "../services/orderServices";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin7Fill } from "react-icons/ri";

export const Cutomers = () => {
  const { data: customers } = useQuery({
    queryKey: ["customer"],
    queryFn: getOrders,
  });

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
    <div>
      <h1 className="text-center text-5xl mt-10 text-white">Customer Table</h1>
      <div className="card mt-10 mx-30">
        <DataTable value={customers?.data} tableStyle={{ minWidth: "10rem" }}>
          <Column field="id" header="ID"></Column>
          <Column field="customerId" header="Customer ID"></Column>
          <Column field="createdAt" header="Created At"></Column>
          <Column field="status" header="Status"></Column>
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

export default Cutomers;
