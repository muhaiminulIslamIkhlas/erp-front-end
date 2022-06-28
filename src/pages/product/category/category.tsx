import React from "react";
import Admin from "../../../components/templates/dashboard/admin";
import List from "../../../components/organism/list/list";

const Category: React.FC = () => {
  return (
    <Admin>
      <List
        buttontext="Create New Category"
        deleteUrl="delete-category"
        listUrl="get-all-category"
        formObject={{
            category_name: "",
            description: "",
          }}
        modalTitle="Create Category"
        tableColumn={[
          {
            title: "Category Name",
            dataIndex: "category_name",
            key: "category_name",
          },
          {
            title: "Description",
            dataIndex: "description",
            key: "description",
          },
        ]}
        type="category"
        pageHeading="All Category"
      />
    </Admin>
  );
};

export default Category;