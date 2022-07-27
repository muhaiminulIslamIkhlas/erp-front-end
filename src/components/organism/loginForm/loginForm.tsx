import React, { useRef, useState } from "react";
import Input from "../../atom/input/input";
import {
  validate,
  validateProperty,
  handleChangeCommon,
} from "../../../lib/form";
import Joi from "joi";
import Button from "../../atom/button/button";
import authServices from "../../../services/authServices";
import Logo from "../../../assets/images/erp.png";
import Container from "../../atom/container/container";
import "./loginForm.scss";
import { useNavigate } from "react-router-dom";
import { Loading } from "notiflix";

interface user {
  username: string;
  password: string;
}

const LoginForm = () => {
  const [data, setAccount] = useState<user | any>({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<any>({});
  const userName = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const rules: any = {
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required()
      .label("User name"),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required()
      .label("Password"),
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const errors = validate(data, rules);
    setErrors(errors ? errors : {});
    if (errors) {
      console.log(errors);
      return;
    }
    Loading.hourglass()
    await authServices.login(data.username, data.password);
    navigate('/')
    Loading.remove();
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const hadleChangeData = handleChangeCommon(e, data, errors, rules);
    setErrors(hadleChangeData.error);
    setAccount(hadleChangeData.account);
  };

  return (
    <div className="o-loginForm">
      <div className="o-loginForm__logo">
        <img className="o-loginForm__img" src={Logo} />
      </div>
      <Container margin="12">
        <div className="o-loginForm__message">
          <h1 className="o-loginForm__title">Welcome</h1>
          <p className="o-loginForm__info">Sign in to continue!</p>
        </div>
      </Container>
      <div className="o-loginForm__form">
        <form onSubmit={handleSubmit}>
          <Container margin="12">
            <Input
              label={false}
              value={data.username}
              onChange={handleChange}
              name="username"
              type="text"
              error={errors.username}
              placeHolder="User Name"
            />
          </Container>
          <Container margin="12">
            <Input
              label={false}
              value={data.password}
              onChange={handleChange}
              type="password"
              name="password"
              error={errors.password}
              placeHolder="Password"
            />
          </Container>
          <Container margin="12">
            {/* <Button onClick={handleSubmit} variant="outlined" >Login</Button> */}
            <Button label="Login" disabled={false} />
          </Container>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
