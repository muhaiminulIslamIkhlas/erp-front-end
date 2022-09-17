import React, { useEffect, useState } from "react";
import Admin from "../../components/templates/dashboard/admin";
import List from "../../components/organism/list/list";
import Container from "../../components/atom/container/container";
import Badge from "../../components/atom/badge/badge";
import { get } from "../../services/dataServices";

const Account: React.FC = () => {
  const [totalBalance, setTotalBalance] = useState<any>(0);
  const fechData = async () => {
    const data = await get("get-total-balance");
    setTotalBalance(data.data);
  };
  useEffect(() => {
    fechData();
  });
  return (
    <Admin>
      <Container align="center" margin="0">
        <Badge isLarge label={`Total Balance: ${totalBalance}`}></Badge>
      </Container>
      <Container margin="16">
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
              title: "Balance",
              dataIndex: "current_balance",
              key: "current_balance",
            },
          ]}
          type="account"
          pageHeading="All Account"
          onFormSubmit={fechData}
        />
      </Container>
    </Admin>
  );
};

export default Account;
