import React, { useEffect, useState } from "react";
import Input from "../../../atom/input/input";
import { validate, handleChangeCommon } from "../../../../lib/form";
import Joi from "joi";
import Button from "../../../atom/button/button";
import { store } from "../../../../services/dataServices";
import Container from "../../../atom/container/container";
import "./supplier.scss";

interface SupplierProps {
  isSuuccess: () => void;
  formData: any;
  buttonText: string;
}

const Supplier: React.FC<SupplierProps> = ({ isSuuccess, formData, buttonText }) => {
  const [data, setData] = useState<any>(formData);

  const [errors, setErrors] = useState<any>({});
  const rules: any = {
    supplier_name: Joi.string().min(3).max(30).required().label("Supplier Name"),
    supplier_address: Joi.string().min(3).max(100).required().label("Address"),
    supplier_phone: Joi.number().min(3).required().label("Phone"),
    id: Joi.optional(),
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const errors = validate(data, rules);
    setErrors(errors ? errors : {});
    console.log(errors);
    if (errors) {
      return;
    }

    let response = await store(data, "create-supplier");
    if (response) {
      setData({
        supplier_name: "",
        supplier_phone: "",
        supplier_address: "",
      });
      isSuuccess();
    }
  };

  useEffect(() => {
    setData(formData);
  }, [formData]);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const hadleChangeData = handleChangeCommon(e, data, errors, rules);
    setErrors(hadleChangeData.error);
    setData(hadleChangeData.account);
  };

  return (
    <div className="o-form">
      <form onSubmit={handleSubmit}>
        <Container margin="12">
          <Input
            label={false}
            value={data.supplier_name}
            onChange={handleChange}
            name="supplier_name"
            type="text"
            error={errors.supplier_name}
            placeHolder="Supplier Name"
          />
          <Container margin="8">
            <Input
              label={false}
              value={data.supplier_phone}
              onChange={handleChange}
              name="supplier_phone"
              type="number"
              error={errors.supplier_phone}
              placeHolder="Phone"
            />
          </Container>
          <Container margin="8">
            <Input
              label={false}
              value={data.supplier_address}
              onChange={handleChange}
              name="supplier_address"
              type="text"
              error={errors.supplier_address}
              placeHolder="Address"
            />
          </Container>
        </Container>
        <Container margin="12">
          <Button label={buttonText} disabled={false} />
        </Container>
      </form>
    </div>
  );
};

export default Supplier;
