import React from "react";
import { useNavigate } from "react-router-dom";
import ProductForm from "../../../../components/molecules/form/product/productForm";
import Admin from "../../../../components/templates/dashboard/admin";

const Create: React.FC = () => {
  const navigate = useNavigate();

  const handleAfterSubmit = () => {
    navigate('/product/item/list')
  }
  return (
    <Admin>
      <div>
        <ProductForm isSuuccess={handleAfterSubmit} />
      </div>
    </Admin>
  );
};

export default Create;
