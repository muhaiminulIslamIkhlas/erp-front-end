import React from "react";
import List from "../../../components/organism/list/list";
import Admin from "../../../components/templates/dashboard/admin";

const Transection = () => {
  return (
    <Admin>
      <List
        listUrl="get-all-transection"
        tableColumn={[
          {
            title: "Account Name",
            dataIndex: "account_name",
            key: "account_name",
          },
          {
            title: "Type",
            dataIndex: "type",
            key: "type",
          },
          {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
          },
          {
            title: "Date",
            dataIndex: "date",
            key: "date",
          },
          {
            title: "Reason",
            dataIndex: "reason",
            key: "reason",
          },
        ]}
        pageHeading="All Transection"
        noAction
      ></List>
    </Admin>
  );
};

export default Transection;
