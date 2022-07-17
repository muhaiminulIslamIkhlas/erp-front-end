import React, { useEffect, useState } from "react";
import Input from "../../../atom/input/input";
import { validate, handleChangeCommon } from "../../../../lib/form";
import Joi from "joi";
import Button from "../../../atom/button/button";
import { store } from "../../../../services/dataServices";
import Container from "../../../atom/container/container";
import "./customerform.scss";

interface CustomerFormProps {
  isSuuccess: () => void;
  formData: any;
  buttonText: string;
}

const CustomerForm: React.FC<CustomerFormProps> = ({
  isSuuccess,
  formData,
  buttonText,
}) => {
  const [data, setData] = useState<any>(formData);
  const [errors, setErrors] = useState<any>({});
  const createUrl = "store-customer";
  const formObj = {
    customer_name: "",
    customer_phone: "",
    customer_address: "",
  };
  const rules: any = {
    customer_name: Joi.string()
      .min(3)
      .max(30)
      .required()
      .label("Customer Name"),
    customer_address: Joi.string().min(3).max(100).required().label("Address"),
    customer_phone: Joi.number().min(3).required().label("Phone"),
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

    let response = await store(data, createUrl);
    if (response) {
      setData(formObj);
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
            value={data.customer_name}
            onChange={handleChange}
            name="customer_name"
            type="text"
            error={errors.customer_name}
            placeHolder="Customer Name"
          />
          <Container margin="8">
            <Input
              label={false}
              value={data.customer_phone}
              onChange={handleChange}
              name="customer_phone"
              type="number"
              error={errors.customer_phone}
              placeHolder="Phone"
            />
          </Container>
          <Container margin="8">
            <Input
              label={false}
              value={data.customer_address}
              onChange={handleChange}
              name="customer_address"
              type="text"
              error={errors.customer_address}
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

export default CustomerForm;
