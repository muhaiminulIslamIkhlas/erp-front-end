import React from "react";
import PurchaseForm from "../../../../components/molecules/form/purchase/purchaseForm";
import Admin from "../../../../components/templates/dashboard/admin";
import "./create.scss";

const Create = () => {
  return (
    <Admin>
      <div>
        <PurchaseForm />
      </div>
    </Admin>
  );
};

export default Create;
