import Joi from "joi";

export const validate = (data: any, rules: any) => {
  const schema: any = Joi.object(rules);
  const result = schema.validate(data, { abortEarly: false });
  if (!result.error) return null;
  const error: any = {};
  for (let item of result.error.details) {
    error[item.path[0]] = item.message;
  }

  return error;
};

export const validateProperty = (name: any, value: any, rules: any) => {
  const obj = { [name]: value };
  const schemaSingle: any = Joi.object({ [name]: rules[name] });
  const errorObj = schemaSingle.validate(obj);
  return errorObj.error ? errorObj.error.details[0].message : null;
};

export const handleChangeCommon = (
  e: React.FormEvent<HTMLInputElement>,
  data: any,
  errors: any,
  rules: any
) => {
  const errorClone = { ...errors };
  const errorMessage = validateProperty(
    e.currentTarget.name,
    e.currentTarget.value,
    rules
  );
  if (errorMessage) {
    errorClone[e.currentTarget.name] = errorMessage;
  } else {
    delete errorClone[e.currentTarget.name];
  }
  // setErrors(errorClone);

  const accountClone = { ...data };
  accountClone[e.currentTarget.name] = e.currentTarget.value;
  // setAccount(accountClone);

  return { error: errorClone, account: accountClone };
};
