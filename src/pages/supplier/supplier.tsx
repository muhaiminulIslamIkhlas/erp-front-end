import React from "react";
import Admin from "../../components/templates/dashboard/admin";
import List from "../../components/organism/list/list";

const Supplier: React.FC = () => {
  return (
    <Admin>
      <List
        buttontext="Create New Supplier"
        deleteUrl="delete-supplier"
        listUrl="get-all-supplier"
        formObject={{
          supplier_name: "",
          supplier_phone: "",
          supplier_address: "",
        }}
        modalTitle="Create Supplier"
        tableColumn={[
          {
            title: "Supplier Name",
            dataIndex: "supplier_name",
            key: "supplier_name",
          },
          {
            title: "Supplier Phone",
            dataIndex: "supplier_phone",
            key: "supplier_phone",
          },
          {
            title: "Supplier Address",
            dataIndex: "supplier_address",
            key: "supplier_address",
          },
        ]}
        type="supplier"
        pageHeading="All Supplier"
      />
    </Admin>
  );
};

export default Supplier;
