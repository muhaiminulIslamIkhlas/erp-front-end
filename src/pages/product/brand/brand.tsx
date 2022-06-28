import React from "react";
import Admin from "../../../components/templates/dashboard/admin";
import List from "../../../components/organism/list/list";

const Brand: React.FC = () => {
  return (
    <Admin>
      <List
        buttontext="Create New Brand"
        deleteUrl="delete-brand"
        listUrl="get-all-brand"
        formObject={{
            brand_name: "",
            description: "",
          }}
        modalTitle="Create Brand"
        tableColumn={[
          {
            title: "Brand Name",
            dataIndex: "brand_name",
            key: "brand_name",
          },
          {
            title: "Description",
            dataIndex: "description",
            key: "description",
          },
        ]}
        type="brand"
        pageHeading="All Brand"
      />
    </Admin>
  );
};

export default Brand;