import React, { useEffect, useState } from "react";
import Input from "../../../atom/input/input";
import { validate, handleChangeCommon } from "../../../../lib/form";
import Joi from "joi";
import Button from "../../../atom/button/button";
import { store } from "../../../../services/dataServices";
import Container from "../../../atom/container/container";
import "./account.scss";

interface AccountProps {
  isSuuccess: () => void;
  formData: any;
  buttonText: string;
  isEdit?: boolean;
}

const Account: React.FC<AccountProps> = ({
  isSuuccess,
  formData,
  buttonText,
  isEdit
}) => {
  const [data, setData] = useState<any>(formData);

  const [errors, setErrors] = useState<any>({});
  const rules: any = {
    account_name: Joi.string().min(3).max(30).required().label("Account name"),
    account_description: Joi.string()
      .min(3)
      .max(100)
      .required()
      .label("Account description"),
    current_balance: Joi.number().min(0).required().label("Initial amount"),
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

    let response = await store(data, "create-account");
    if (response) {
      setData({
        account_name: "",
        account_description: "",
        current_balance: "",
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
          <Container margin="8">
            <Input
              label={false}
              value={data.account_name}
              onChange={handleChange}
              name="account_name"
              type="text"
              error={errors.account_name}
              placeHolder="Account name"
            />
          </Container>
          <Container margin="8">
            <Input
              label={false}
              value={data.account_description}
              onChange={handleChange}
              name="account_description"
              type="text"
              error={errors.account_description}
              placeHolder="Account description"
            />
          </Container>
          <Container margin="8">
            <Input
              label={false}
              value={data.current_balance}
              onChange={handleChange}
              name="current_balance"
              type="text"
              error={errors.current_balance}
              placeHolder="Initial amount"
              isdisbled={isEdit}
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

export default Account;
