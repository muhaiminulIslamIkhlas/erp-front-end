import React, { useEffect, useState } from "react";
import "./pos.scss";
import PosTemplate from "../../components/templates/pos/pos";
import {
  DeleteOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import Container from "../../components/atom/container/container";
import { Card, Col, Row } from "antd";
import { get } from "../../services/dataServices";
import ModalComponent from "../../components/organism/modalcomponent/modalcomponent";
import Input from "../../components/atom/input/input";
import Button from "../../components/atom/button/button";
import Notiflix from "notiflix";
import { MdRemoveShoppingCart } from "react-icons/md";

const Pos = () => {
  const [product, setProduct] = useState<any>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalProduct, setModalProduct] = useState<any>({
    price: "0",
    qty: "0",
    total: "0",
    discount: "0",
    product_id: "0",
    product_name: "",
  });

  const [cart, setCart] = useState<any>([]);

  const fetchSelectData = async () => {
    let allProduct = await get("get-all-product-raw", false);
    setProduct(allProduct.data);
    console.log(allProduct);
  };

  const handleProductAddModal = (e: any) => {
    let cloneModalProduct = { ...modalProduct };
    cloneModalProduct[e.target.name] = e.target.value;
    setModalProduct(cloneModalProduct);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleModalButton = () => {
    let cloneCart = [...cart];
    if (!modalProduct.price && !modalProduct.qty && !modalProduct.discount) {
      Notiflix.Report.failure("Error!!!", "Any field can't be null", "Okay");
      return;
    }
    modalProduct.total =
      modalProduct.qty * modalProduct.price - modalProduct.discount;
    cloneCart.push(modalProduct);
    setCart(cloneCart);
    setModalProduct({
      price: "0",
      qty: "0",
      total: "0",
      discount: "0",
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
      qty: 0,
      total: 0,
      discount: 0,
    });

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
  };

  const increment = (i: any) => {
    let cartClone = [...cart];
    cartClone[i]["qty"] += 1;
    cartClone[i]["total"] =
      cartClone[i]["qty"] * cartClone[i]["price"] - cartClone[i]["discount"];
    setCart(cartClone);
  };

  const removeCart = (index: any) => {
    let data = [...cart];
    data.splice(index, 1);
    setCart(data);
  };

  useEffect(() => {
    fetchSelectData();
  }, ["product"]);
  return (
    <PosTemplate>
      <div className="p-pos">
        <div className="p-pos__cart">
          <div className="p-pos__row p-pos__row--title">
            <div className="p-pos__element p-pos__element--product">Name</div>
            <div className="p-pos__element">Qty</div>
            <div className="p-pos__element">Price</div>
            <div className="p-pos__element">Discount</div>
            <div className="p-pos__element">Total</div>
            <div className="p-pos__element">Remove</div>
          </div>
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
                <div className="p-pos__element">{item.discount}</div>
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
        </div>
        <div className="p-pos__item">
          <ModalComponent
            isOpen={isOpen}
            closeModal={closeModal}
            title="Add Item"
          >
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
              <Button
                label="Add"
                onClick={handleModalButton}
                disabled={false}
              />
            </Container>
          </ModalComponent>
          <Card style={{ height: "100vh" }}>
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
