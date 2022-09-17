import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Pagination, Space, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../../components/atom/button/button";
import Container from "../../../../components/atom/container/container";
import Header from "../../../../components/atom/heading/header";
import Input from "../../../../components/atom/input/input";
import Admin from "../../../../components/templates/dashboard/admin";
import { deleteData, get } from "../../../../services/dataServices";
import "./list.scss";

interface ListProps {}

interface DataType {
  key: string;
  dataIndex: string;
  title: string;
}

const List: React.FC<ListProps> = () => {
  const navigate = useNavigate();
  const listUrl = "get-all-product";
  const deleteUrl = "delete-product";
  const [data, setData] = useState<any>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [total, setTotal] = useState<any>(0);
  const [current, setCurrent] = useState<any>(1);
  const fetchData = async (page?: number, pageSize = 10) => {
    let fetchedData: any;
    if (page) {
      fetchedData = await get(
        listUrl + "?page=" + page + "&perPage=" + pageSize
      );
    } else {
      fetchedData = await get(listUrl + "?perPage=" + pageSize);
    }
    setData(fetchedData.data.data);
    setTotal(fetchedData.data.total);
    setCurrent(fetchedData.data.current_page);
  };
  const handleDelete = async (record: any) => {
    await deleteData(deleteUrl, record.id);
    fetchData();
  };

  const handleEdit = async (record: any) => {
    navigate("/product/item/edit/" + record.id);
  };

  const columns: ColumnsType<DataType> = [
    {
      key: "product_name",
      dataIndex: "product_name",
      title: "Product Name",
    },
    {
      key: "brand",
      dataIndex: "brand",
      title: "Brand",
    },
    {
      key: "category",
      dataIndex: "category",
      title: "Category",
    },
    {
      key: "selling_price",
      dataIndex: "selling_price",
      title: "selling_price",
    },
    {
      key: "initial_stock",
      dataIndex: "initial_stock",
      title: "initial_stock",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined
            onClick={() => {
              handleEdit(record);
            }}
          />
          <DeleteOutlined
            onClick={async () => {
              await handleDelete(record);
            }}
          />
        </Space>
      ),
    },
  ];

  const handleSearch = (e: any) => {
    console.log(e.target.value);
    setSearchValue(e.target.value);
  };

  const handleCreateNew = () => {
    navigate("/product/item/create");
  };

  useEffect(() => {
    fetchData();
  }, ["data"]);

  return (
    <Admin>
      <div className="p-productList">
        <Header Tag="h2" text="All Product" />
        <Container margin="12">
          <div className="o-list__topBar">
            <Input
              label={false}
              placeHolder="Search"
              name="search"
              type="text"
              onChange={handleSearch}
              value={searchValue}
            />
            <Button
              label="Create New"
              onClick={handleCreateNew}
              disabled={false}
            ></Button>
          </div>
        </Container>
        <Container margin="24">
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            size="small"
          />
        </Container>
        <Container margin="8">
          <Pagination
            defaultCurrent={6}
            onChange={fetchData}
            total={total}
            size="small"
            current={current}
          />
        </Container>
      </div>
    </Admin>
  );
};

export default List;
