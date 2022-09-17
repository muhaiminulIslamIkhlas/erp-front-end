import { Col } from "antd";
import Joi from "joi";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/atom/button/button";
import Container from "../../../components/atom/container/container";
import Header from "../../../components/atom/heading/header";
import Input from "../../../components/atom/input/input";
import Admin from "../../../components/templates/dashboard/admin";
import { handleChangeCommon, validate } from "../../../lib/form";
import { get, store } from "../../../services/dataServices";

const Widthdraw: React.FC = () => {
    const nvigate = useNavigate();
    const [accounts, setAccounts] = useState<any>([]);
    const [data, setData] = useState<any>({
      account_id: "",
      amount: 0,
      reason: "",
    });
    const [errors, setErrors] = useState<any>({});
  
    const rules: any = {
      account_id: Joi.required().label("Account"),
      amount: Joi.number().min(1).required().label("Amount"),
      reason: Joi.string().required().label("Reason"),
    };
  
    const handleSubmit = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      const errors = validate(data, rules);
      setErrors(errors ? errors : {});
      console.log(errors);
      if (errors) {
        return;
      }
  
      let response = await store(data, "widthdraw-amount");
      if (response) {
        nvigate("/account");
      }
    };
  
    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
      const hadleChangeData = handleChangeCommon(e, data, errors, rules);
      setErrors(hadleChangeData.error);
      setData(hadleChangeData.account);
    };
  
    useEffect(() => {
      const fetchAccount = async () => {
        let accountServer = await get("get-all-account-select", false);
        setAccounts(accountServer.data);
      };
      fetchAccount();
    }, ["accounts"]);
    console.log(data);
    return (
      <Admin>
        <Header Tag="h2" text="Widthdraw Amount"></Header>
        <Container margin="12">
        <Col className="gutter-row" span={8}>
          <form onSubmit={handleSubmit}>
            <Container margin="12">
              <Container margin="8">
                <Input
                  label="Account"
                  value={data.account_id}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  name="account_id"
                  type="select"
                  options={accounts}
                />
              </Container>
              <Container margin="8">
                <Input
                  label="Amount"
                  value={data.current_balance}
                  onChange={handleChange}
                  name="amount"
                  type="number"
                  error={errors.amount}
                  placeHolder="Amount"
                />
              </Container>
              <Container margin="8">
                <Input
                  label="Reason"
                  value={data.reason}
                  onChange={handleChange}
                  name="reason"
                  type="text"
                  error={errors.reason}
                  placeHolder="Reason"
                />
              </Container>
            </Container>
            <Container margin="12">
              <Button label="Add Amount" disabled={false} />
            </Container>
          </form>
        </Col>
        </Container>
      </Admin>
    );
  };

export default Widthdraw;
