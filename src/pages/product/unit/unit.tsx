import React, { useEffect, useState } from "react";
import Admin from "../../../components/templates/dashboard/admin";
import Button from "../../../components/atom/button/button";
import UnitForm from "../../../components/organism/Form/unit/unit";
import ModalComponent from "../../../components/organism/modalcomponent/modalcomponent";
import { get } from "../../../services/dataServices";
import { Pagination, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/lib/table";
import Container from "../../../components/atom/container/container";

interface UnitProps {}
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "unit_name",
    key: "unit_name",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const Unit: React.FC<UnitProps> = () => {
  const [data, setData] = useState<any>([]);
  const [total, setTotal] = useState<any>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const fetchData = async (page?: number,pageSize = 10) => {
    let fetchedData: any;
    if (page) {
      fetchedData = await get("get-all-unit" + "?page=" + page+"&perPage="+pageSize);
    } else {
      fetchedData = await get("get-all-unit"+"?perPage="+pageSize);
    }
    setData(fetchedData.data.data);
    setTotal(fetchedData.data.total);
  };

  useEffect(() => {
    fetchData();
  }, ["data"]);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Admin>
      <ModalComponent
        isOpen={isOpen}
        closeModal={closeModal}
        title="Create Unit"
      >
        <>
          <UnitForm isSuuccess={closeModal} />
        </>
      </ModalComponent>
      <Button
        label="Create New Unit"
        onClick={handleClick}
        disabled={false}
      ></Button>
      <div>
        <Table columns={columns} dataSource={data} pagination={false} size="small" />
        <Container margin="8">
          <Pagination
            defaultCurrent={6}
            onChange={fetchData}
            total={total}
            size="small"
          />
        </Container>
      </div>
    </Admin>
  );
};

export default Unit;
