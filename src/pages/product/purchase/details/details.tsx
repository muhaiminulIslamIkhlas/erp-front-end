import { Badge, Card, Descriptions, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Admin from "../../../../components/templates/dashboard/admin";
import { get } from "../../../../services/dataServices";
import "./details.scss";

interface DataType {
  key: string;
  dataIndex: string;
  title: string;
}

const Details: React.FC = () => {
  let params = useParams();
  const listUrl = "get-purchase/" + params.detailsId;
  console.log(listUrl);
  const [data, setData] = useState<any>([]);
  const fetchData = async () => {
    let fetchedData: any;
    fetchedData = await get(listUrl);
    console.log(fetchedData.data);
    setData(fetchedData.data);
  };
  useEffect(() => {
    fetchData();
  }, ["data"]);
  const columns: ColumnsType<DataType> = [
    {
      key: "product",
      dataIndex: "product",
      title: "Product",
    },
    {
      key: "qty",
      dataIndex: "qty",
      title: "Qty",
    },
    {
      key: "unit_price",
      dataIndex: "unit_price",
      title: "Unit Price",
    },
    {
      key: "total",
      dataIndex: "total",
      title: "Total",
    },
  ];
  return (
    <Admin>
      <div className="p-purchaseDetails">
        <Descriptions title="Purchase Details" layout="vertical" bordered>
          <Descriptions.Item label="Supplier">
            {data.supplier}
          </Descriptions.Item>
          <Descriptions.Item label="Invoice No">
            {data.invoice_no}
          </Descriptions.Item>
          <Descriptions.Item label="Purchase Date">
            {data.date}
          </Descriptions.Item>
          <Descriptions.Item label="Grand Total">
            {data.grand_total}
          </Descriptions.Item>
          <Descriptions.Item label="Payment">{data.payment}</Descriptions.Item>
          <Descriptions.Item label="Due">{data.due}</Descriptions.Item>
          <Descriptions.Item label="Discount">{data.discount}</Descriptions.Item>
          <Descriptions.Item label="Other Cost" span={2}>{data.other_cost}</Descriptions.Item>
          <Descriptions.Item label="Items" >
            <Table
              columns={columns}
              dataSource={data.items}
              pagination={false}
              size="small"
            />
          </Descriptions.Item>
        </Descriptions>
      </div>
    </Admin>
  );
};

export default Details;
