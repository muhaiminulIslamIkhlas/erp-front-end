import React, { useEffect, useRef, useState } from "react";
import Button from "../../../components/atom/button/button";
import UnitForm from "../../../components/organism/Form/unit/unit";
import BrandForm from "../../../components/organism/Form/brand/brand";
import CategoryForm from "../../../components/organism/Form/category/category";
import AccountForm from "../../../components/organism/Form/account/account";
import SupplierForm from "../../../components/organism/Form/supplier/supplier";
import ModalComponent from "../../../components/organism/modalcomponent/modalcomponent";
import { deleteData, get } from "../../../services/dataServices";
import { Pagination, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/lib/table";
import Container from "../../../components/atom/container/container";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import "./list.scss";
import Input from "../../atom/input/input";
import CustomerForm from "../../molecules/form/cutomer/customerform";
import { Confirm } from "notiflix";

interface DataType {
  key: string;
  dataIndex: string;
  title: string;
}

interface UnitProps {
  formObject?: any;
  tableColumn: DataType[];
  listUrl: string;
  editUrl?: string;
  deleteUrl?: string;
  buttontext?: string;
  modalTitle?: string;
  type?: "unit" | "account" | "brand" | "category" | "supplier" | "customer";
  pageHeading: string;
  onFormSubmit?: () => void;
  noAction?: boolean;
}

const List: React.FC<UnitProps> = ({
  formObject,
  tableColumn,
  listUrl,
  buttontext,
  deleteUrl,
  modalTitle,
  type,
  pageHeading,
  onFormSubmit,
  noAction,
}) => {
  const [data, setData] = useState<any>([]);
  const [total, setTotal] = useState<any>(0);
  const [current, setCurrent] = useState<any>(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>(formObject);
  const [buttonText, setButtonText] = useState<string>("Create");
  const [searchValue, setSearchValue] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);
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
    if (deleteUrl) {
      await deleteData(deleteUrl, record.id);
      fetchData();
    }
  };

  const handleEdit = async (record: any) => {
    setFormData(record);
    setButtonText("Update");
    setIsOpen(true);
    setIsEdit(true);
  };

  const handleCreateNew = () => {
    setFormData(formObject);
    setIsOpen(true);
    setButtonText("Create");
  };

  const closeModal = () => {
    setIsOpen(false);
    setIsEdit(false);
  };

  const submitSuccess = () => {
    closeModal();
    fetchData();
    if (onFormSubmit) {
      onFormSubmit();
    }
  };

  const handleSearch = (e: any) => {
    console.log(e.target.value);
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    fetchData();
  }, ["data"]);

  const columns: ColumnsType<DataType> = noAction
    ? [...tableColumn]
    : [
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
                onClick={() => {
                  Confirm.show(
                    "Are You Sure ?",
                    "Do you really want to delete this ?",
                    "Yes",
                    "No",
                    async () => {
                      await handleDelete(record);
                    }
                  );
                }}
              />
            </Space>
          ),
        },
      ];
  return (
    <div className="o-list">
      {modalTitle && (
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
          {type === "account" && (
            <AccountForm
              isSuuccess={submitSuccess}
              formData={formData}
              buttonText={buttonText}
              isEdit={isEdit}
            />
          )}
          {type === "brand" && (
            <BrandForm
              isSuuccess={submitSuccess}
              formData={formData}
              buttonText={buttonText}
            />
          )}
          {type === "category" && (
            <CategoryForm
              isSuuccess={submitSuccess}
              formData={formData}
              buttonText={buttonText}
            />
          )}
          {type === "supplier" && (
            <SupplierForm
              isSuuccess={submitSuccess}
              formData={formData}
              buttonText={buttonText}
            />
          )}
          {type === "customer" && (
            <CustomerForm
              isSuuccess={submitSuccess}
              formData={formData}
              buttonText={buttonText}
            />
          )}
        </ModalComponent>
      )}
      <div className="o-list__heading">
        <h2>{pageHeading}</h2>
      </div>
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
          {buttontext && (
            <Button
              label={buttontext}
              onClick={handleCreateNew}
              disabled={false}
            ></Button>
          )}
        </div>
      </Container>
      <Container margin="12">
        <div className="o-list__table">
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
      </Container>
    </div>
  );
};

export default List;
