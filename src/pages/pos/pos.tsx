import React, { useEffect, useState } from "react";
import "./pos.scss";
import PosTemplate from "../../components/templates/pos/pos";
import {
  DeleteOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import Container from "../../components/atom/container/container";
import { Button, Card, Col, Row } from "antd";
import { get } from "../../services/dataServices";
import ModalComponent from "../../components/organism/modalcomponent/modalcomponent";
import Input from "../../components/atom/input/input";
import ButtonCustom from "../../components/atom/button/button";
import Notiflix from "notiflix";
import Header from "../../components/atom/heading/header";
import CustomerForm from "../../components/molecules/form/cutomer/customerform";

const Pos = () => {
  const date = new Date();
  const [product, setProduct] = useState<any>([]);
  const [customer, setCustomer] = useState<any>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<any>("product");
  const [finalCalculation, setFinalCalculation] = useState<any>({
    date: date.toISOString().slice(0, 10),
    items: 0,
    subTotal: 0,
    discount: 0,
    otherCost: 0,
    total: 0,
  });
  const [modalProduct, setModalProduct] = useState<any>({
    price: 0,
    qty: 0,
    total: 0,
    discount: 0,
    product_id: "0",
    product_name: "",
  });

  const [cart, setCart] = useState<any>([]);

  const fetchSelectData = async () => {
    let allProduct = await get("get-all-product-raw", false);
    setProduct(allProduct.data);
  };

  const calculateFinalData = (cart: any) => {
    let qty = 0;
    let subTotal = 0;
    let Total = 0;

    cart.map((item: any) => {
      qty += item.qty;
      subTotal += item.total;
    });

    Total = subTotal + finalCalculation.otherCost - finalCalculation.discount;
    setFinalCalculation({
      date: date.toISOString().slice(0, 10),
      items: qty,
      subTotal: subTotal,
      discount: finalCalculation.discount,
      otherCost: finalCalculation.otherCost,
      total: Total,
    });
  };

  const handleProductAddModal = (e: any) => {
    let cloneModalProduct = { ...modalProduct };
    cloneModalProduct[e.target.name] = e.target.value;
    setModalProduct(cloneModalProduct);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const addToCartFromModal = () => {
    let cloneCart = [...cart];
    if (!modalProduct.price && !modalProduct.qty && !modalProduct.discount) {
      Notiflix.Report.failure("Error!!!", "Any field can't be null", "Okay");
      return;
    }
    modalProduct.total =
      modalProduct.qty * modalProduct.price - modalProduct.discount;
    let isDuplicate = 0;
    const newClone = cloneCart.map((item: any) => {
      if (item.product_id === modalProduct.product_id) {
        item.price = parseInt(modalProduct.price);
        item.discount = parseInt(modalProduct.discount);
        item.qty = parseInt(item.qty) + parseInt(modalProduct.qty);
        item.total = item.qty * item.price - item.discount;
        isDuplicate = 1;
        return item;
      }
      return item;
    });

    if (!isDuplicate) {
      newClone.push(modalProduct);
    }
    setCart(newClone);
    calculateFinalData(newClone);
    setModalProduct({
      price: 0,
      qty: 0,
      total: 0,
      discount: 0,
      product_id: "0",
      product_name: "",
    });
    closeModal();
  };

  const handleProductClick = (item: any) => {
    setModalProduct({
      price: item.selling_price,
      product_name: item.product_name,
      product_id: item.id,
      qty: 1,
      total: 0,
      discount: 0,
    });
    setModalType("product");
    setIsOpen(true);
  };

  const decrementCart = (i: any) => {
    let cartClone = [...cart];
    if (cartClone[i]["qty"] > 1) {
      cartClone[i]["qty"] -= 1;
      cartClone[i]["total"] =
        cartClone[i]["qty"] * cartClone[i]["price"] - cartClone[i]["discount"];
    }
    setCart(cartClone);
    calculateFinalData(cartClone);
  };

  const increment = (i: any) => {
    let cartClone = [...cart];
    cartClone[i]["qty"] = parseInt(cartClone[i]["qty"]) + 1;
    cartClone[i]["total"] =
      parseInt(cartClone[i]["qty"]) * parseInt(cartClone[i]["price"]) -
      parseInt(cartClone[i]["discount"]);
    setCart(cartClone);
    calculateFinalData(cartClone);
  };

  const removeCart = (index: any) => {
    let data = [...cart];
    data.splice(index, 1);
    setCart(data);
    calculateFinalData(data);
  };

  const handleDiscountChange = (e: any, i: any) => {
    let cartClone = [...cart];
    cartClone[i]["discount"] = parseInt(e.target.value);
    if (e.target.value) {
      cartClone[i]["total"] =
        parseInt(cartClone[i]["qty"]) * parseInt(cartClone[i]["price"]) -
        parseInt(cartClone[i]["discount"]);
    } else {
      cartClone[i]["discount"] = 0;
      cartClone[i]["total"] =
        parseInt(cartClone[i]["qty"]) * parseInt(cartClone[i]["price"]) -
        parseInt(cartClone[i]["discount"]);
    }
    setCart(cartClone);
    calculateFinalData(cartClone);
  };

  const handleFinalCalculation = (e: any) => {
    let cloneFinalCalculation = { ...finalCalculation };
    if (e.target.value) {
      cloneFinalCalculation[e.target.name] = parseInt(e.target.value);
      cloneFinalCalculation["total"] =
        cloneFinalCalculation["subTotal"] +
        cloneFinalCalculation["otherCost"] -
        cloneFinalCalculation["discount"];
    } else {
      cloneFinalCalculation[e.target.name] = 0;
      cloneFinalCalculation["total"] =
        cloneFinalCalculation["subTotal"] +
        cloneFinalCalculation["otherCost"] -
        cloneFinalCalculation["discount"];
    }

    setFinalCalculation(cloneFinalCalculation);
  };

  const getAllCustomer = async () => {
    let allCustomer = await get("get-all-customer-select", false);
    setCustomer(allCustomer.data);
  };

  const handleCustomer = (e: any) => {
    console.log(e.target.value);
  };

  const customerAddButton = () => {
    setModalType("customer");
    setIsOpen(true);
  };

  const handleCustomerAddSuccess = () => {
    getAllCustomer();
    setIsOpen(false);
  };

  const handlePayment = () => {
    setModalType("payment");
    setIsOpen(true);
  };

  useEffect(() => {
    fetchSelectData();
    getAllCustomer();
  }, ["product"]);

  return (
    <PosTemplate>
      <div className="p-pos">
        <div className="p-pos__cart">
          <Card style={{ height: "95vh", borderRadius: "8px" }}>
            <Container margin="8">
              <Header Tag="h3" text="Customer" />
              <div className="p-pos__customer">
                <Input
                  label={false}
                  value=""
                  onChange={(e) => {
                    handleCustomer(e);
                  }}
                  name=""
                  type="select"
                  options={customer}
                />
                <Button
                  style={{ alignSelf: "center" }}
                  type="dashed"
                  icon={<PlusOutlined />}
                  shape="circle"
                  onClick={customerAddButton}
                />
              </div>
            </Container>
            <Container margin="8">
              <div className="p-pos__row p-pos__row--title">
                <div className="p-pos__element p-pos__element--product">
                  Name
                </div>
                <div className="p-pos__element">Qty</div>
                <div className="p-pos__element">Price</div>
                <div className="p-pos__element">Discount</div>
                <div className="p-pos__element">Total</div>
                <div className="p-pos__element">Remove</div>
              </div>
            </Container>
            {cart.map((item: any, i: any) => {
              return (
                <div className="p-pos__row" key={i}>
                  <div className="p-pos__element p-pos__element--product">
                    {item.product_name}
                  </div>
                  <div className="p-pos__element">
                    {" "}
                    <MinusCircleOutlined
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        decrementCart(i);
                      }}
                    />
                    <span className="p-pos__qty">{item.qty}</span>
                    <PlusCircleOutlined
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        increment(i);
                      }}
                    />
                  </div>
                  <div className="p-pos__element">{item.price}</div>
                  <div className="p-pos__element">
                    <input
                      className="p-pos__discount"
                      type="text"
                      name="discount"
                      onChange={(e) => {
                        handleDiscountChange(e, i);
                      }}
                      value={item.discount}
                    />
                  </div>
                  <div className="p-pos__element">{item.total}</div>
                  <div className="p-pos__element">
                    <DeleteOutlined
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={() => {
                        removeCart(i);
                      }}
                    />
                  </div>
                </div>
              );
            })}
            <div className="p-pos__calculation">
              <div></div>
              <div>
                <div className="p-pos__calculation__item">
                  <span className="p-pos__calculation__label">Date:</span>
                  <span className="p-pos__calculation__value">
                    {finalCalculation.date}
                  </span>
                </div>
                <div className="p-pos__calculation__item">
                  <span className="p-pos__calculation__label">
                    Total Items:
                  </span>
                  <span className="p-pos__calculation__value">
                    {finalCalculation.items}
                  </span>
                </div>
                <div className="p-pos__calculation__item">
                  <span className="p-pos__calculation__label">Sub Total:</span>
                  <span className="p-pos__calculation__value">
                    {finalCalculation.subTotal}
                  </span>
                </div>
                <div className="p-pos__calculation__item">
                  <Container margin="8">
                    <span className="p-pos__calculation__label">
                      Discount :
                    </span>
                    <span className="p-pos__calculation__value">
                      <input
                        className="p-pos__discount"
                        type="text"
                        name="discount"
                        onChange={(e) => {
                          handleFinalCalculation(e);
                        }}
                        value={finalCalculation.discount}
                      />
                    </span>
                  </Container>
                </div>
                <div className="p-pos__calculation__item">
                  <Container margin="8">
                    <span className="p-pos__calculation__label">
                      Other Cost:
                    </span>
                    <span className="p-pos__calculation__value">
                      <input
                        className="p-pos__discount"
                        type="text"
                        name="otherCost"
                        onChange={(e) => {
                          handleFinalCalculation(e);
                        }}
                        value={finalCalculation.otherCost}
                      />
                    </span>
                  </Container>
                </div>
                <div className="p-pos__calculation__item">
                  <span className="p-pos__calculation__label">Total:</span>
                  <span className="p-pos__calculation__value">
                    {finalCalculation.total}
                  </span>
                </div>
                <div className="p-pos__calculation__item">
                  <Container margin="16">
                    <ButtonCustom
                      label="Payment"
                      onClick={handlePayment}
                      disabled={false}
                    />
                  </Container>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className="p-pos__item">
          <ModalComponent
            isOpen={isOpen}
            closeModal={closeModal}
            title={
              modalType === "customer"
                ? "Add Customer"
                : modalType === "product"
                ? "Add Item"
                : "Payment"
            }
          >
            {modalType === "product" && (
              <>
                <Container margin="8">
                  <Input
                    label="Price"
                    value={modalProduct.price}
                    onChange={handleProductAddModal}
                    name="price"
                    type="number"
                    placeHolder="Price"
                  />
                </Container>
                <Container margin="12">
                  <Input
                    label="Qty"
                    value={modalProduct.qty}
                    onChange={handleProductAddModal}
                    name="qty"
                    type="number"
                    placeHolder="Qty"
                  />
                </Container>
                <Container margin="12">
                  <Input
                    label="Discount"
                    value={modalProduct.discount}
                    onChange={handleProductAddModal}
                    name="discount"
                    type="number"
                    placeHolder="discount"
                  />
                </Container>
                <Container margin="20">
                  <ButtonCustom
                    label="Add"
                    onClick={addToCartFromModal}
                    disabled={false}
                  />
                </Container>
              </>
            )}

            {modalType === "customer" && (
              <>
                <CustomerForm
                  formData={{
                    customer_name: "",
                    customer_phone: "",
                    customer_address: "",
                  }}
                  buttonText="Add Customer"
                  isSuuccess={handleCustomerAddSuccess}
                />
              </>
            )}

            {modalType === "payment" && (
              <>
                <h1>Payment</h1>
              </>
            )}
          </ModalComponent>
          <Card style={{ height: "95vh", borderRadius: "8px" }}>
            <Row gutter={[16, 16]}>
              {product.map((item: any, i: any) => {
                return (
                  <Col className="gutter-row" span={8} key={i}>
                    <div
                      className="p-pos__productCard"
                      onClick={() => {
                        handleProductClick(item);
                      }}
                    >
                      <ShoppingCartOutlined
                        style={{ fontSize: "40px", color: "#08c" }}
                      />
                      <Container margin="8">
                        <p className="p-pos__name">{item.product_name}</p>
                      </Container>
                      <Container margin="4">
                        <p className="p-pos__price">{item.brand}</p>
                      </Container>
                      <Container margin="4">
                        <p className="p-pos__price">
                          {item.selling_price} Taka
                        </p>
                      </Container>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </Card>
        </div>
      </div>
    </PosTemplate>
  );
};

export default Pos;
