import React, { useEffect, useState } from "react";
import Input from "../../../atom/input/input";
import { validate, handleChangeCommon } from "../../../../lib/form";
import Joi from "joi";
import Button from "../../../atom/button/button";
import { store } from "../../../../services/dataServices";
import Container from "../../../atom/container/container";
import "./brand.scss";

interface BrandProps {
  isSuuccess: () => void;
  formData: any;
  buttonText: string;
}

const Brand: React.FC<BrandProps> = ({ isSuuccess, formData, buttonText }) => {
  const [data, setData] = useState<any>(formData);

  const [errors, setErrors] = useState<any>({});
  const rules: any = {
    brand_name: Joi.string().min(3).max(30).required().label("Unit"),
    description: Joi.string().min(3).max(100).required().label("Unit"),
    id: Joi.optional(),
    created_at: Joi.optional(),
    updated_at: Joi.optional(),
    store_id: Joi.optional(),
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const errors = validate(data, rules);
    setErrors(errors ? errors : {});
    console.log(errors);
    if (errors) {
      return;
    }

    let response = await store(data, "create-brand");
    if (response) {
      setData({
        brand_name: "",
        description: "",
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
            value={data.brand_name}
            onChange={handleChange}
            name="brand_name"
            type="text"
            error={errors.brand_name}
            placeHolder="Brand Name"
          />
          <Container margin="8">
            <Input
              label={false}
              value={data.description}
              onChange={handleChange}
              name="description"
              type="text"
              error={errors.description}
              placeHolder="Brand description"
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

export default Brand;
