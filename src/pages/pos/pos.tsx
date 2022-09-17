import React, { useEffect, useState } from "react";
import "./pos.scss";
import PosTemplate from "../../components/templates/pos/pos";
import {
  DeleteOutlined,
  DollarOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import Container from "../../components/atom/container/container";
import { Button, Card, Col, Row, Tag } from "antd";
import { get, sell } from "../../services/dataServices";
import ModalComponent from "../../components/organism/modalcomponent/modalcomponent";
import Input from "../../components/atom/input/input";
import ButtonCustom from "../../components/atom/button/button";
import Notiflix, { Report } from "notiflix";
import Header from "../../components/atom/heading/header";
import CustomerForm from "../../components/molecules/form/cutomer/customerform";
import { useNavigate } from "react-router-dom";
import jsPDFInvoiceTemplate, {
  OutputType,
  jsPDF,
} from "jspdf-invoice-muhaimin";
import Logo from "../../assets/images/erp.png";
import Badge from "../../components/atom/badge/badge";

const Pos = () => {
  const date = new Date();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>([]);
  const [filteredProduct, setFilteredProduct] = useState<any>([]);
  const [serachName, setSerachName] = useState<any>("");
  const [category, setCategory] = useState<any>([]);
  const [customer, setCustomer] = useState<any>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [resetCustomer, setResetCustomer] = useState<boolean>(false);
  const [modalType, setModalType] = useState<any>("product");
  const [paymentMethod, setPaymentMethod] = useState<any>([]);
  const [stockedOutProduct, setStockedOutProduct] = useState<any>([]);
  const [payment, setPayment] = useState<any>({
    due: 0,
    previousDue: 0,
    payment: 0,
    paymentMethod: 0,
    customer_id: "",
  });
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
    let allCategory = await get("get-all-category-select", false);
    setProduct(allProduct.data);
    setFilteredProduct(allProduct.data);
    setCategory(allCategory.data);
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
    if (modalType === "payment") {
      let paymentClone = { ...payment };
      paymentClone.due = finalCalculation.total;
      paymentClone.payment = 0;
      setPayment(paymentClone);
    }
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

  const handleCustomer = async (e: any) => {
    setResetCustomer(false);
    if (e.target.value) {
      let previousDue = await get("get-previous-due/" + e.target.value, true);
      let paymentClone = { ...payment };
      paymentClone.customer_id = e.target.value;
      paymentClone.previousDue = previousDue.data;
      setPayment(paymentClone);
    } else {
      let paymentClone = { ...payment };
      paymentClone.customer_id = e.target.value;
      paymentClone.previousDue = 0;
      setPayment(paymentClone);
    }
  };

  const customerAddButton = () => {
    setModalType("customer");
    setIsOpen(true);
  };

  const handleCustomerAddSuccess = () => {
    getAllCustomer();
    setIsOpen(false);
  };

  const handlePayment = async () => {
    if (!cart.length) {
      Report.warning("Warning", "Please add some product first", "Okay");
      return;
    }
    if (!payment.customer_id) {
      Report.warning("Warning", "Please select a customer", "Okay");
      return;
    }
    let paymentMethods = await get("get-all-account-select", false);
    setPaymentMethod(paymentMethods.data);
    let paymentClone = { ...payment };
    paymentClone.due = finalCalculation.total;
    setPayment(paymentClone);
    setModalType("payment");
    setIsOpen(true);
  };

  const handlePaymentOption = (e: any) => {
    let paymentClone = { ...payment };
    if (e.target.name === "payment") {
      if (e.target.value) {
        paymentClone[e.target.name] = parseInt(e.target.value);
        if (paymentClone[e.target.name] > finalCalculation.total) {
          Notiflix.Report.failure(
            "Error!!!",
            "Payment can't greater than total",
            "Okay"
          );
          return;
        }
        paymentClone["due"] =
          finalCalculation.total - paymentClone[e.target.name];
      } else {
        paymentClone[e.target.name] = 0;
      }
    } else {
      paymentClone[e.target.name] = parseInt(e.target.value);
    }

    setPayment(paymentClone);
  };

  const gotoDashboard = () => {
    navigate("/home");
  };

  const setToDefault = () => {
    let paymentClone = { ...payment };
    paymentClone.due = 0;
    paymentClone.previousDue = 0;
    paymentClone.payment = 0;
    paymentClone.paymentMethod = 0;
    paymentClone.customer_id = "";
    setPayment(paymentClone);
    setCart([]);
    setFinalCalculation({
      date: date.toISOString().slice(0, 10),
      items: 0,
      subTotal: 0,
      discount: 0,
      otherCost: 0,
      total: 0,
    });
    setResetCustomer(true);
  };

  const paymentComplete = async () => {
    if (!payment.paymentMethod) {
      Report.warning("Error!!!", "Please choose a payment option", "Okay");
      return;
    }
    if (!payment.customer_id) {
      Report.warning("Error!!!", "Please choose a customer", "Okay");
      return;
    }
    const purchaseData = {
      items: cart,
      payment,
      finalCalculation,
    };
    let response = await sell(purchaseData, "sell");
    setStockedOutProduct(response.data.stockedOutProduct);
    if (!response.data.error) {
      var props = {
        outputType: OutputType.DataUrlNewWindow,
        returnJsPDFDocObject: true,
        fileName: "Invoice 2021",
        orientationLandscape: false,
        compress: true,
        logo: {
          src: Logo,
          type: "PNG",
          width: 43.33,
          height: 26.66,
          margin: {
            top: 0,
            left: 0,
          },
        },
        business: {
          name: "Business Name",
          address: "Albania, Tirane ish-Dogana, Durres 2001",
          phone: "(+355) 069 11 11 111",
          email: "email@example.com",
          email_1: "info@example.al",
          website: "www.example.al",
        },
        contact: {
          //From server
          label: "Invoice issued for:",
          name: response.data.customer.customer_name,
          address: response.data.customer.customer_address,
          phone: response.data.customer.customer_phone,
        },
        invoice: {
          label: "Invoice #: ", //From Server
          num: response.data.invoice_no, //From Server
          invDate: "Date: " + finalCalculation.date,
          headerBorder: false,
          tableBodyBorder: false,
          header: [
            {
              title: "#",
              style: {
                width: 10,
              },
            },
            {
              title: "Company",
              style: {
                width: 25,
              },
            },
            {
              title: "Item Name",
              style: {
                width: 55,
              },
            },
            { title: "Size" },
            { title: "Color" },
            { title: "Qty" },
            { title: "Unit" },
            {
              title: "Rate",
              style: {
                width: 20,
              },
            },
            { title: "Less" },
            { title: "Amount" },
          ],
          table: cart.map((item: any, index: any) => {
            return [
              index + 1,
              response.data.cart_item[item.product_id].brand,
              item.product_name,
              response.data.cart_item[item.product_id].size
                ? response.data.cart_item[item.product_id].size
                : "-",
              response.data.cart_item[item.product_id].color
                ? response.data.cart_item[item.product_id].color
                : "-",
              item.qty,
              response.data.cart_item[item.product_id].unit,
              item.price,
              item.discount,
              item.total,
            ];
          }),
          additionalRows: [
            {
              col1: "Total Amount:",
              col2: finalCalculation.total.toString(),
            },
            {
              col1: "Sub Total:",
              col2: finalCalculation.subTotal.toString(),
            },
            {
              col1: "Discount:",
              col2: finalCalculation.discount.toString(),
            },
            {
              col1: "Other Cost:",
              col2: finalCalculation.otherCost.toString(),
            },
            {
              col1: "Previous Due:",
              col2: payment.previousDue.toString(),
            },
            {
              col1: "Total Payable Amount:",
              col2: (
                parseInt(payment.previousDue) + parseInt(finalCalculation.total)
              ).toString(),
            },
            {
              col1: "Paid Amount:",
              col2: payment.payment.toString(),
            },
            {
              col1: "Net Dues:",
              col2: (
                parseInt(payment.previousDue) +
                parseInt(finalCalculation.total) -
                parseInt(payment.payment)
              ).toString(),
            },
          ],
          invDescLabel: "Signature",
          invDesc: "Invoice is not valid without signature",
        },
        footer: {
          text: "The invoice is created on a computer and is not valid without the signature and stamp.",
        },
        pageEnable: true,
        pageLabel: "Page ",
      };

      closeModal();
      setToDefault();
      const pdfObject: any = jsPDFInvoiceTemplate(props);
    }
  };

  const StockedOutProduct = () => (
    <div className="p-pos__stockedOutList">
      {stockedOutProduct.length > 0 && (
        <Header Tag="h3" text="These are low stock product" />
      )}
      <Container margin="4">
        {stockedOutProduct.map((item: any, i: any) => (
          <div className="p-pos__stockItem">
            <Tag icon={<DollarOutlined />} color="magenta">
              Product Name: {item.product_name}
            </Tag>
            <Tag icon={<DollarOutlined />} color="magenta">
              Product Qty: {item.qty}
            </Tag>
          </div>
        ))}
      </Container>
    </div>
  );

  const handleFilterProduct = (categoryName: any) => {
    let filteredData;
    setSerachName("");
    if (!categoryName) {
      filteredData = product;
    } else {
      filteredData = product.filter((item: any) => {
        if (item.category == categoryName) {
          return true;
        }
      });
    }
    setFilteredProduct(filteredData);
  };

  const handleProductSearch = (e: any) => {
    const value = e.target.value;
    setSerachName(value);
    if (value.length == 0 || value.length == undefined) {
      setFilteredProduct(product);
    } else {
      const matchNameProduct = product.filter((item: any) => {
        let query = value.toLowerCase();
        return item.product_name.toLowerCase().includes(query);
      });
      setFilteredProduct(matchNameProduct);
    }
  };

  useEffect(() => {
    fetchSelectData();
    getAllCustomer();
  }, ["product", "category"]);

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
                  defaultSelect={resetCustomer}
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
                  <div className="p-pos__element">{item.total}
                  <DeleteOutlined
                      style={{ color: "red", cursor: "pointer", marginLeft: "5px" }}
                      onClick={() => {
                        removeCart(i);
                      }}
                    />
                  </div>
                  {/* <div className="p-pos__remove">
                    
                  </div> */}
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
                <div className="p-pos__payment">
                  <Input
                    label="Account"
                    value={payment.paymentMethod}
                    onChange={(e) => {
                      handlePaymentOption(e);
                    }}
                    name="paymentMethod"
                    type="select"
                    options={paymentMethod}
                  />
                  <Input
                    label="Payment"
                    value={payment.payment}
                    onChange={(e) => {
                      handlePaymentOption(e);
                    }}
                    name="payment"
                    type="number"
                  />
                </div>
                <div className="p-pos_info">
                  <Container margin="12">
                    <Tag icon={<DollarOutlined />} color="magenta">
                      Total: {finalCalculation.total}
                    </Tag>
                    <Tag icon={<DollarOutlined />} color="magenta">
                      Due: {payment.due}
                    </Tag>
                    <Tag icon={<DollarOutlined />} color="magenta">
                      Previous Due: {payment.previousDue}
                    </Tag>
                  </Container>
                  <Container margin="12">
                    <ButtonCustom
                      type="primary"
                      onClick={paymentComplete}
                      label="Complete Payment"
                      disabled={!cart.length}
                    />
                  </Container>
                  <Container margin="12">{StockedOutProduct()}</Container>
                </div>
              </>
            )}
          </ModalComponent>

          <Card style={{ height: "95vh", borderRadius: "8px" }}>
            <div className="p-pos__actionContainer">
              <ButtonCustom
                label="Dashboard"
                onClick={gotoDashboard}
                disabled={false}
                type="primary"
              />
              <Input
                label={false}
                name="search_product"
                onChange={handleProductSearch}
                type="text"
                value={serachName}
                placeHolder="Search Product"
              />
            </div>
            <Container margin="12">
              <Row>
                <Col span={4}>
                  <div className="p-pos__productFilter">
                    <Button
                      type="dashed"
                      style={{ marginBottom: "15px" }}
                      block
                      onClick={() => {
                        handleFilterProduct(0);
                      }}
                    >
                      All Product
                    </Button>
                    {category.map((item: any, i: any) => {
                      return (
                        <Button
                          key={i}
                          type="dashed"
                          style={{ marginBottom: "15px" }}
                          block
                          onClick={() => {
                            handleFilterProduct(item.label);
                          }}
                        >
                          {item.label}
                        </Button>
                      );
                    })}
                  </div>
                </Col>
                <Col span={20}>
                  <Row gutter={[16, 16]}>
                    {filteredProduct.map((item: any, i: any) => {
                      return (
                        <Col className="gutter-row" span={8} key={i}>
                          <div
                            className="p-pos__productCard"
                            onClick={() => {
                              handleProductClick(item);
                            }}
                          >
                            <Container margin="8">
                              <p className="p-pos__name">{item.product_name}</p>
                            </Container>
                            <Container margin="4">
                              <p className="p-pos__price">{item.brand}</p>
                            </Container>
                            {}
                            <Container margin="4">
                              <p className="p-pos__size">
                                <Badge label={item.size ? item.size : "none"} />
                                &nbsp; | &nbsp;
                                <Badge
                                  label={item.color ? item.color : "none"}
                                />
                              </p>
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
                </Col>
              </Row>
            </Container>
          </Card>
        </div>
      </div>
    </PosTemplate>
  );
};

export default Pos;
