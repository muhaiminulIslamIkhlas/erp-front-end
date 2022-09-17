import React from "react";
import { useNavigate } from "react-router-dom";
import ProductFormEdit from "../../../../components/molecules/form/product/productFormEdit";
import Admin from "../../../../components/templates/dashboard/admin";

const Edit: React.FC = () => {
  const navigate = useNavigate();

  const handleAfterSubmit = () => {
    navigate("/product/item/list");
  };

  return (
    <Admin>
      <div>
        <ProductFormEdit isSuuccess={handleAfterSubmit} />
      </div>
    </Admin>
  );
};

export default Edit;
