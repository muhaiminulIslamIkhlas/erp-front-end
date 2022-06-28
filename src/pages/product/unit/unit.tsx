import React from "react";
import Admin from "../../../components/templates/dashboard/admin";
import List from "../../../components/organism/list/list";

const Unit: React.FC = () => {
  return (
    <Admin>
      <List
        buttontext="Create New Unit"
        deleteUrl="delete-unit"
        listUrl="get-all-unit"
        formObject={{
          unit_name: "",
        }}
        modalTitle="Create Unit"
        tableColumn={[
          {
            title: "Name",
            dataIndex: "unit_name",
            key: "unit_name",
          },
        ]}
        type="unit"
        pageHeading="All Unit"
      />
    </Admin>
  );
};

export default Unit;
