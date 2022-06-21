import React, { useState } from "react";
import Input from "../../../atom/input/input";
import { validate, handleChangeCommon } from "../../../../lib/form";
import Joi from "joi";
import Button from "../../../atom/button/button";
import { store } from "../../../../services/dataServices";
import Container from "../../../atom/container/container";
import "./unit.scss";
import { useNavigate } from "react-router-dom";

interface UnitProps {
  isSuuccess: () => void;
}

const Unit: React.FC<UnitProps> = ({ isSuuccess }) => {
  const [data, setAccount] = useState<any>({
    unit_name: "",
  });

  const [errors, setErrors] = useState<any>({});
  const rules: any = {
    unit_name: Joi.string().alphanum().min(3).max(30).required().label("Unit"),
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const errors = validate(data, rules);
    setErrors(errors ? errors : {});
    if (errors) {
      return;
    }
    let response = await store({ unit_name: data.unit_name }, "store-unit");
    if (response) {
      setAccount({
        unit_name: "",
      });
      isSuuccess();
    }
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const hadleChangeData = handleChangeCommon(e, data, errors, rules);
    setErrors(hadleChangeData.error);
    setAccount(hadleChangeData.account);
  };

  return (
    <div className="o-form">
      <form onSubmit={handleSubmit}>
        <Container margin="12">
          <Input
            label={false}
            value={data.unit_name}
            onChange={handleChange}
            name="unit_name"
            type="text"
            error={errors.unit_name}
            placeHolder="unit"
          />
        </Container>
        <Container margin="12">
          <Button label="Create" disabled={false} />
        </Container>
      </form>
    </div>
  );
};

export default Unit;
