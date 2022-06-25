import React, { useEffect, useState } from "react";
import Button from "../../../components/atom/button/button";
import UnitForm from "../../../components/organism/Form/unit/unit";
import ModalComponent from "../../../components/organism/modalcomponent/modalcomponent";
import { deleteData, get } from "../../../services/dataServices";
import { Pagination, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/lib/table";
import Container from "../../../components/atom/container/container";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import "./list.scss";

interface DataType {
  key: string;
  dataIndex: string;
  title: string;
}

interface UnitProps {
  formObject: any;
  tableColumn: DataType[];
  listUrl: string;
  editUrl?: string;
  deleteUrl: string;
  buttontext: string;
  modalTitle: string;
  type: "unit";
}

const List: React.FC<UnitProps> = ({
  formObject,
  tableColumn,
  listUrl,
  buttontext,
  deleteUrl,
  modalTitle,
  type,
}) => {
  const [data, setData] = useState<any>([]);
  const [total, setTotal] = useState<any>(0);
  const [current, setCurrent] = useState<any>(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>(formObject);
  const [buttonText, setButtonText] = useState<string>("Create");

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
    setFormData(record);
    setButtonText("Update");
    setIsOpen(true);
  };

  const handleCreateNew = () => {
    setFormData(formObject);
    setIsOpen(true);
    setButtonText("Create");
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const submitSuccess = () => {
    closeModal();
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, ["data"]);

  const columns: ColumnsType<DataType> = [
    ...tableColumn,
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
  return (
    <>
      <ModalComponent
        isOpen={isOpen}
        closeModal={closeModal}
        title={modalTitle}
      >
        {type === "unit" && (
          <UnitForm
            isSuuccess={submitSuccess}
            formData={formData}
            buttonText={buttonText}
          />
        )}
      </ModalComponent>
      <></>
      <Button
        label={buttontext}
        onClick={handleCreateNew}
        disabled={false}
      ></Button>
      <div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          size="small"
        />
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
    </>
  );
};

export default List;
