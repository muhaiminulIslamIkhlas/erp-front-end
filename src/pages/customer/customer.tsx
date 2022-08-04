import React from "react";
import Admin from "../../components/templates/dashboard/admin";
import List from "../../components/organism/list/list";

const Customer: React.FC = () => {
  const formObj = {
    customer_name: "",
    customer_phone: "",
    customer_address: "",
  };
  const listUrl = "get-all-customer";
  const deleteUrl = "delete-customer";
  const buttonText = "Create New Customer";
  const modalTitle = "Customer";
  const tableColumn = [
    {
      title: "Customer Name",
      dataIndex: "customer_name",
      key: "customer_name",
    },
    {
      title: "Phone",
      dataIndex: "customer_phone",
      key: "customer_phone",
    },
    {
      title: "Address",
      dataIndex: "customer_address",
      key: "customer_address",
    },
  ];
  return (
    <Admin>
      <List
        buttontext={buttonText}
        deleteUrl={deleteUrl}
        listUrl={listUrl}
        formObject={formObj}
        modalTitle={modalTitle}
        tableColumn={tableColumn}
        type="customer"
        pageHeading="All Customer"
      />
    </Admin>
  );
};

export default Customer;