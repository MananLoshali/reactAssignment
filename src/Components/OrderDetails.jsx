import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { request } from "../requestMethods";
import styled from "styled-components";
import writeXlsxFile from "write-excel-file";
const Button = styled.button`
  padding: 10px 20px;
  background-color: #337ab7;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const OrderDetails = () => {
  const location = useLocation();
  const [tableData, setTableData] = useState([]);
  const id = location.pathname.split("/")[2];
  console.log(id);

  const handleSubmit = async (e) => {
    const HEADER_ROW = [
      {
        value: "Order_ID",
        fontWeight: "bold",
      },
      {
        value: "Order_Date",
        fontWeight: "bold",
      },
      {
        value: "Item",
        fontWeight: "bold",
      },
      {
        value: "Count",
        fontWeight: "bold",
      },
      {
        value: "Weight",
        fontWeight: "bold",
      },
      {
        value: "Requests",
        fontWeight: "bold",
      },
    ];

    const headerData = tableData.map((item) => [
      {
        type: Number,
        value: item.order_id,
      },

      {
        type: String,
        value: item.order_date,
      },

      {
        type: String,
        value: item.item,
      },

      {
        type: String,
        value: item.count,
      },
      {
        type: String,
        value: item.weight,
      },
      {
        type: String,
        value: item.requests,
      },
    ]);

    const data = [HEADER_ROW, ...headerData];
    console.log("DATA ---", headerData);
    console.log("TABLE DATA _---", tableData);
    await writeXlsxFile(data, {
      fileName: "file.xlsx",
    });
  };

  const getOrderDetails = async () => {
    try {
      const res = await request.get(`/orderDetails?id=${id}`);
      console.log(res.data);
      setTableData(res.data);
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  useEffect(() => {
    getOrderDetails();
  }, []);

  return (
    <div>
      <Button onClick={handleSubmit}>Export To Excel</Button>
      <table>
        <tr>
          <th>Order Id</th>
          <th>Order Date</th>
          <th>Item</th>
          <th>Count</th>
          <th>Weight</th>
          <th>Requests</th>
        </tr>
        {tableData?.map((item) => (
          <tr>
            <th>{item.order_id}</th>
            <th>{item.order_date}</th>
            <th>{item.item}</th>
            <th>{item.count}</th>
            <th>{item.weight}</th>
            <th>{item.requests}</th>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default OrderDetails;
