import React from "react";
import Admin from "../../components/templates/dashboard/admin";
import List from "../../components/organism/list/list";

const Account: React.FC = () => {
  return (
    <Admin>
      <List
        buttontext="Create New Account"
        deleteUrl="delete-account"
        listUrl="get-all-account"
        formObject={{
          account_name: "",
          account_description: "",
          current_balance: "",
        }}
        modalTitle="Create Unit"
        tableColumn={[
          {
            title: "Account Name",
            dataIndex: "account_name",
            key: "account_name",
          },
          {
            title: "Account Description",
            dataIndex: "account_description",
            key: "account_description",
          },
          {
            title: "Initial Amount",
            dataIndex: "current_balance",
            key: "current_balance",
          },
        ]}
        type="account"
        pageHeading="All Account"
      />
    </Admin>
  );
};

export default Account;
