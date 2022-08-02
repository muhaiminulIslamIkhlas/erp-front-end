import { Col, Row } from "antd";
import Joi from "joi";
import React, { useEffect, useRef, useState } from "react";
import { handleChangeCommon, validate } from "../../../../lib/form";
import { get, store } from "../../../../services/dataServices";
import ButtonCustom from "../../../atom/button/button";
import Container from "../../../atom/container/container";
import Header from "../../../atom/heading/header";
import Input from "../../../atom/input/input";
import ModalComponent from "../../../../components/organism/modalcomponent/modalcomponent";
import "./purchaseForm.scss";
import Notiflix from "notiflix";
import { DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface PurchaseFormProps {
  isSuuccess?: () => void;
  back?: () => void;
}

const PurchaseForm: React.FC<PurchaseFormProps> = ({ isSuuccess, back }) => {
  const nvigate = useNavigate();
  const [errors, setErrors] = useState<any>({});
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const date = new Date();
  const [supplier, setSupplier] = useState<any>([]);
  const [account, setAccount] = useState<any>([]);
  const [product, setProduct] = useState<any>([]);
  const [item, setItem] = useState<any>([]);
  const [selectedItem, setSetselectedItemItem] = useState<any>({});
  const [purchaseList, setPurchaseList] = useState<any>([]);
  const [unitPrice, setUnitPrice] = useState<any>(0);
  const [qty, setQty] = useState<any>(0);
  const [total, setTotal] = useState<any>(0);
  const createUrl = "make-purchase";

  const formObj = {
    invoice_no: "",
    date: date.toISOString().slice(0, 10),
    supplier_id: "",
    account_id: "",
    grand_total: "0",
    due: "0",
    payment: "0",
    total: "0",
    other_cost: "0",
    discount: "0",
  };
  const [data, setData] = useState<any>(formObj);

  const rules: any = {
    invoice_no: Joi.string().min(3).max(100).required().label("Invoice No"),
    date: Joi.string().required().label("Date"),
    supplier_id: Joi.string().required().label("Supplier"),
    account_id: Joi.string().required().label("Account"),
    discount: Joi.number().optional(),
    other_cost: Joi.number().optional(),
    total: Joi.optional(),
    due: Joi.number().optional(),
    payment: Joi.number().optional(),
    grand_total: Joi.number().optional(),
  };

  const formEl = useRef<any>();

  const fetchSelectData = async () => {
    let allSupplier = await get("get-all-supplier-select", false);
    let allAccount = await get("get-all-account-select", false);
    let allProduct = await get("get-all-product-select", false);
    setAccount(allAccount.data);
    setSupplier(allSupplier.data);
    setProduct(allProduct.data);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    // console.log(data);
    const errors = validate(data, rules);
    setErrors(errors ? errors : {});

    if (errors) {
      return;
    }

    if (!purchaseList.length) {
      Notiflix.Report.failure(
        "Error!!!",
        "Please add product to your purchase list",
        "Okay"
      );

      return;
    }

    const fullData = { ...data, items: purchaseList };
    const formInputs = [...formEl.current.elements].filter(
      (element) => element.type === "number"
    );
    formInputs.map((i: any) => {
      if (i.name == "due" || i.name == "grand_total" || i.name == "total") {
        fullData[i.name] = i.value;
      }
    });
    console.log(fullData);
    let response = await store(fullData, createUrl);
    if (response) {
      setData(formObj);
      nvigate("/product/item/purchase/list");
    }
  };

  useEffect(() => {
    fetchSelectData();
  }, ["brand"]);

  const handleChange = (e: any) => {
    console.log(e.target.value);
    const hadleChangeData = handleChangeCommon(e, data, errors, rules);
    setErrors(hadleChangeData.error);
    setData(hadleChangeData.account);
  };

  const handleUnitQtyChange = (e: any) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    if (name === "unitPrice") {
      setUnitPrice(value);
    } else if (name === "qty") {
      setQty(value);
    }
  };

  const handlePurchaseAdd = () => {
    if (!(qty && unitPrice)) {
      Notiflix.Report.failure(
        "Error!!!",
        "Unit price or Qty can't be null",
        "Okay"
      );
      return;
    }

    let purchaseListClone = [...purchaseList];
    purchaseListClone.push({
      product_name: selectedItem.label,
      product_id: selectedItem.value,
      unit_price: unitPrice,
      qty: qty,
      total: unitPrice * qty,
    });
    const sum = purchaseListClone.reduce((accumulator, object) => {
      return accumulator + object.total;
    }, 0);
    setTotal(sum);
    setPurchaseList(purchaseListClone);
    setQty(0);
    setUnitPrice(0);
    closeModal();
  };

  const handleItem = (e: any) => {
    const targetValue = e.target.value;
    console.log();
    setItem(e.target.value);
    const searchObject = product.find((item: any) => item.value == targetValue);
    console.log(searchObject);
    if (targetValue) {
      setSetselectedItemItem(searchObject);

      setIsOpen(true);
    }
  };

  const handleDynamicFormChange = (index: any, event: any) => {
    let dynamicData = [...purchaseList];
    dynamicData[index][event.target.name] = event.target.value;
    dynamicData[index]["total"] =
      dynamicData[index]["qty"] * dynamicData[index]["unit_price"];
    dynamicData[index][event.target.name] = event.target.value;
    const sum = dynamicData.reduce((accumulator, object) => {
      return accumulator + object.total;
    }, 0);
    setTotal(sum);
    setPurchaseList(dynamicData);
  };

  const removeFields = (index: any) => {
    let data = [...purchaseList];
    data.splice(index, 1);
    setPurchaseList(data);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  let discount = data.discount;
  let GrandTotal = total + parseInt(data.other_cost) - discount;
  return (
    <div className="m-purcaseForm">
      <ModalComponent isOpen={isOpen} closeModal={closeModal} title="Add Item">
        <Container margin="8">
          <Input
            label="Unit Price"
            value={unitPrice}
            onChange={handleUnitQtyChange}
            name="unitPrice"
            type="number"
            placeHolder="Unit Price"
          />
        </Container>
        <Container margin="12">
          <Input
            label="Qty"
            value={qty}
            onChange={handleUnitQtyChange}
            name="qty"
            type="number"
            placeHolder="Qty"
          />
        </Container>
        <Container margin="20">
          <ButtonCustom
            label="Add"
            onClick={handlePurchaseAdd}
            disabled={false}
          />
        </Container>
      </ModalComponent>
      <Header Tag="h2" text="Product Create" />
      <form ref={formEl} onSubmit={handleSubmit}>
        <Container margin="12">
          <Row gutter={[32, 16]}>
            <Col className="gutter-row" span={6}>
              <Input
                label="Invoice no"
                value={data.invoice_no}
                onChange={handleChange}
                name="invoice_no"
                type="text"
                error={errors.invoice_no}
                placeHolder="Invoice No"
              />
            </Col>
            <Col className="gutter-row" span={6}>
              <Input
                label="Date"
                value={data.date}
                onChange={handleChange}
                name="date"
                type="date"
                error={errors.date}
              />
            </Col>
            <Col className="gutter-row" span={6}>
              <Input
                label="Supplier"
                value={data.supplier_id}
                onChange={handleChange}
                name="supplier_id"
                type="select"
                error={errors.supplier_id}
                options={supplier}
              />
            </Col>
            <Col className="gutter-row" span={6}>
              <Input
                label="Account"
                value={data.account_id}
                onChange={handleChange}
                name="account_id"
                type="select"
                error={errors.account_id}
                options={account}
              />
            </Col>
            <Col className="gutter-row" span={6}>
              <Input
                label="Product"
                value={item}
                onChange={handleItem}
                name=""
                type="select"
                options={product}
              />
            </Col>
          </Row>
        </Container>
        <Container margin="24">
          <>
            {purchaseList.length > 0 && (
              <div className="m-purcaseForm__item">
                <div className="m-purcaseForm__item__element">
                  <label className="a-input__label">SL</label>
                </div>
                <div className="m-purcaseForm__item__element">
                  <label className="a-input__label">Product Name</label>
                </div>
                <div className="m-purcaseForm__item__element">
                  <label className="a-input__label">Unit Price</label>
                </div>
                <div className="m-purcaseForm__item__element">
                  <label className="a-input__label">Quantity</label>
                </div>
                <div className="m-purcaseForm__item__element">
                  <label className="a-input__label">Total</label>
                </div>
              </div>
            )}

            {purchaseList.map((item: any, i: any) => {
              return (
                <div className="m-purcaseForm__item">
                  <div className="m-purcaseForm__item__element">{i + 1}</div>
                  <div className="m-purcaseForm__item__element">
                    <Input
                      label={false}
                      value={item.product_name}
                      onChange={(e) => {
                        handleDynamicFormChange(i, e);
                      }}
                      name="product_name"
                      type="text"
                      isdisbled
                      placeHolder="Product Name"
                    />
                  </div>
                  <div className="m-purcaseForm__item__element">
                    <Input
                      label={false}
                      value={item.unit_price}
                      onChange={(e) => {
                        handleDynamicFormChange(i, e);
                      }}
                      name="unit_price"
                      type="text"
                      placeHolder="Product Name"
                    />
                  </div>
                  <div className="m-purcaseForm__item__element">
                    <Input
                      label={false}
                      value={item.qty}
                      onChange={(e) => {
                        handleDynamicFormChange(i, e);
                      }}
                      name="qty"
                      type="text"
                      placeHolder="Qty"
                    />
                  </div>

                  <div className="m-purcaseForm__item__element">
                    <Input
                      label={false}
                      value={item.total}
                      onChange={(e) => {
                        handleDynamicFormChange(i, e);
                      }}
                      name="total"
                      type="text"
                      placeHolder="Total"
                      isdisbled
                    />
                  </div>
                  <div className="m-purcaseForm__item__element">
                    <DeleteOutlined onClick={() => removeFields(i)} />
                  </div>
                </div>
              );
            })}
          </>
        </Container>
        <Container margin="24">
          <Row>
            <Col className="gutter-row" span={12}></Col>
            <Col className="gutter-row" span={6}>
              <Container margin="8">
                <Input
                  label="Discount (Flat/Percent)"
                  value={data.discount}
                  onChange={handleChange}
                  name="discount"
                  type="number"
                  error={errors.discount}
                />
              </Container>
              <Container margin="8">
                <Input
                  label="Other cost"
                  value={data.other_cost}
                  onChange={handleChange}
                  name="other_cost"
                  type="number"
                  error={errors.other_cost}
                  options={supplier}
                />
              </Container>
              <Container margin="8">
                <Input
                  label="Total"
                  value={total}
                  onChange={handleChange}
                  name="total"
                  type="number"
                  error={errors.total}
                  isdisbled
                />
              </Container>
              <Container margin="8">
                <Input
                  label="Grand Total"
                  value={GrandTotal}
                  onChange={handleChange}
                  name="grand_total"
                  type="number"
                  isdisbled
                  error={errors.grand_total}
                />
              </Container>
              <Container margin="8">
                <Input
                  label="Payment"
                  value={data.payment}
                  onChange={handleChange}
                  name="payment"
                  type="number"
                  error={errors.payment}
                />
              </Container>
              <Container margin="8">
                <Input
                  label="Due"
                  value={GrandTotal - data.payment}
                  onChange={handleChange}
                  name="due"
                  type="number"
                  error={errors.due}
                />
              </Container>
            </Col>
          </Row>
        </Container>
        <Container margin="24">
          <Row>
            <Col span={12}></Col>
            <Col span={6}>
              <div className="o-form__button">
                <ButtonCustom label="Purchase" disabled={false} />
              </div>
            </Col>
          </Row>
        </Container>
      </form>
    </div>
  );
};

export default PurchaseForm;
