import { Col, Row } from "antd";
import Joi from "joi";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { handleChangeCommon, validate } from "../../../../lib/form";
import { get, store } from "../../../../services/dataServices";
import ButtonCustom from "../../../atom/button/button";
import Container from "../../../atom/container/container";
import Header from "../../../atom/heading/header";
import Input from "../../../atom/input/input";
import "./productForm.scss";

interface ProductFormEdit {
  isSuuccess: () => void;
  back?: () => void;
}

const ProductFormEdit: React.FC<ProductFormEdit> = ({ isSuuccess, back }) => {
  let params = useParams();
  const getProductUrl = "product-edit/" + params.productId;
  const [errors, setErrors] = useState<any>({});
  const [product, setProduct] = useState<any>({});
  const [brand, setBrand] = useState<any>([]);
  const [unit, setUnit] = useState<any>([]);
  const [category, setCategory] = useState<any>([]);
  const editUrl = "edit-product";
  const formObj = {
    product_name: "",
    brand_id: "",
    unit_id: "",
    category_id: "",
    size: "",
    color: "",
    purchase_price: "",
    selling_price: "",
    initial_stock: "",
    warrenty: "",
    guarantee: "",
    description: "",
    available_for_online: "",
    id: "",
  };
  const [data, setData] = useState<any>(formObj);

  const rules: any = {
    product_name: Joi.string().min(3).max(100).required().label("Product Name"),
    brand_id: Joi.required().label("Brand"),
    unit_id: Joi.required().label("Unit"),
    category_id: Joi.required().label("Category"),
    purchase_price: Joi.number().required().label("Purchase"),
    selling_price: Joi.number().required().label("Selling price"),
    initial_stock: Joi.number().required().label("Initial price"),
    id: Joi.optional(),
    available_for_online: Joi.optional(),
    color: Joi.optional(),
    description: Joi.optional(),
    guarantee: Joi.optional(),
    warrenty: Joi.optional(),
    size: Joi.optional(),
    store_id: Joi.optional(),
    created_at: Joi.optional(),
    online_image: Joi.optional(),
    online_image_second: Joi.optional(),
    updated_at: Joi.optional(),
  };

  const fetchSelectData = async () => {
    let allBrand = await get("get-all-brand-select", false);
    let allUnit = await get("get-all-unit-select", false);
    let allCategory = await get("get-all-category-select", false);
    let singleProduct = await get(getProductUrl);
    let fetchedProduct = singleProduct.data;
    setBrand(allBrand.data);
    setUnit(allUnit.data);
    setCategory(allCategory.data);
    setProduct(fetchedProduct);
    let productClone = { ...product };
    productClone.id = fetchedProduct.id;
    productClone.product_name = fetchedProduct.product_name;
    productClone.brand_id = fetchedProduct.brand_id;
    productClone.unit_id = fetchedProduct.unit_id;
    productClone.category_id = fetchedProduct.category_id;
    productClone.size = fetchedProduct.size;
    productClone.color = fetchedProduct.color;
    productClone.purchase_price = fetchedProduct.purchase_price;
    productClone.selling_price = fetchedProduct.selling_price;
    productClone.initial_stock = fetchedProduct.initial_stock;
    productClone.warrenty = fetchedProduct.warrenty;
    productClone.guarantee = fetchedProduct.guarantee;
    productClone.description = fetchedProduct.description;
    productClone.available_for_online = fetchedProduct.available_for_online;
    setData(productClone);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const errors = validate(data, rules);
    console.log(errors);
    setErrors(errors ? errors : {});
    if (errors) {
      return;
    }

    let response = await store(data, editUrl);
    if (response) {
      setData(formObj);
      isSuuccess();
    }
  };

  useEffect(() => {
    fetchSelectData();
  }, ["brand"]);

  const handleChange = (e: any) => {
    const hadleChangeData = handleChangeCommon(e, data, errors, rules);
    setErrors(hadleChangeData.error);
    setData(hadleChangeData.account);
  };

  return (
    <div className="o-form">
      <Header Tag="h2" text="Product Create" />
      <form onSubmit={handleSubmit}>
        <Container margin="12">
          <Row gutter={[32, 16]}>
            <Col className="gutter-row" span={6}>
              <Input
                label="Product Name"
                value={data.product_name}
                onChange={handleChange}
                name="product_name"
                type="text"
                error={errors.product_name}
                placeHolder="Product Name"
              />
            </Col>
            <Col className="gutter-row" span={6}>
              <Input
                label="Brand"
                value={data.brand_id}
                selectedId={data.brand_id}
                onChange={handleChange}
                name="brand_id"
                type="select"
                error={errors.brand_id}
                options={brand}
              />
            </Col>
            <Col className="gutter-row" span={6}>
              <Input
                label="Unit"
                value={data.unit_id}
                selectedId={data.unit_id}
                onChange={handleChange}
                name="unit_id"
                type="select"
                error={errors.unit_id}
                options={unit}
              />
            </Col>
            <Col className="gutter-row" span={6}>
              <Input
                label="Category"
                value={data.category_id}
                selectedId={data.category_id}
                onChange={handleChange}
                name="category_id"
                type="select"
                error={errors.category_id}
                options={category}
              />
            </Col>
            <Col className="gutter-row" span={6}>
              <Input
                label="Size"
                value={data.size}
                onChange={handleChange}
                name="size"
                type="text"
                error={errors.size}
                placeHolder="Product Size"
              />
            </Col>
            <Col className="gutter-row" span={6}>
              <Input
                label="Color"
                value={data.color}
                onChange={handleChange}
                name="color"
                type="text"
                error={errors.color}
                placeHolder="Product Color"
              />
            </Col>
            <Col className="gutter-row" span={6}>
              <Input
                label="Selling Price"
                value={data.selling_price}
                onChange={handleChange}
                name="selling_price"
                type="number"
                error={errors.selling_price}
                placeHolder="Selling Price"
              />
            </Col>
            <Col className="gutter-row" span={6}>
              <Input
                label="Warrenty"
                value={data.warrenty}
                onChange={handleChange}
                name="warrenty"
                type="text"
                error={errors.warrenty}
                placeHolder="Warrenty"
              />
            </Col>
            <Col className="gutter-row" span={6}>
              <Input
                label="Guarantee"
                value={data.guarantee}
                onChange={handleChange}
                name="guarantee"
                type="text"
                error={errors.guarantee}
                placeHolder="Guarantee"
              />
            </Col>
            <Col className="gutter-row" span={6}>
              <Input
                label="Description"
                value={data.description}
                onChange={handleChange}
                name="description"
                type="text"
                error={errors.description}
                placeHolder="Description"
              />
            </Col>
          </Row>
        </Container>
        <Container margin="24">
          <div className="o-form__button">
            <ButtonCustom label="Update" disabled={false} />
          </div>
        </Container>
      </form>
    </div>
  );
};

export default ProductFormEdit;
