import React, { useEffect, useState } from "react";
import Input from "../../../atom/input/input";
import { validate, handleChangeCommon } from "../../../../lib/form";
import Joi from "joi";
import Button from "../../../atom/button/button";
import { store } from "../../../../services/dataServices";
import Container from "../../../atom/container/container";
import "./category.scss";

interface CategoryProps {
  isSuuccess: () => void;
  formData: any;
  buttonText: string;
}

const Category: React.FC<CategoryProps> = ({ isSuuccess, formData, buttonText }) => {
  const [data, setData] = useState<any>(formData);

  const [errors, setErrors] = useState<any>({});
  const rules: any = {
    category_name: Joi.string().min(3).max(30).required().label("Category"),
    description: Joi.string().min(3).max(100).required().label("Description"),
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

    let response = await store(data, "create-category");
    if (response) {
      setData({
        category_name: "",
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
            value={data.category_name}
            onChange={handleChange}
            name="category_name"
            type="text"
            error={errors.category_name}
            placeHolder="Catgory Name"
          />
          <Container margin="8">
            <Input
              label={false}
              value={data.description}
              onChange={handleChange}
              name="description"
              type="text"
              error={errors.description}
              placeHolder="Catgory description"
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

export default Category;
