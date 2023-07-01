import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { request } from "../requestMethods";
import { useNavigate } from "react-router-dom";

const ChangePasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputField = styled.input`
  margin-bottom: 10px;
  padding: 8px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #337ab7;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const Customer = () => {
  const navigate = useNavigate();
  const [orderDate, setOrderDate] = useState("");
  const [company, setCompany] = useState("");
  const [owner, setOwner] = useState("");
  const [item, setItem] = useState("");
  const [count, setCount] = useState("");
  const [errors, setErrors] = useState(false);
  const [weight, setWeight] = useState("");
  const [requests, setRequests] = useState("");

  const handleSubmit = async (e) => {
    const data = {
      order_date: orderDate,
      item,
      count,
      weight,
      requests,
      company,
    };
    e.preventDefault();
    if (!orderDate || !item || !count || !weight || !requests) {
      setErrors(true);
      return;
    }
    try {
      const res = await request.post("/customer", data);
      console.log(res.data);
    } catch (error) {
      console.log("ERROR");
    }
  };

  const getIDFromLocalStorage = async () => {
    const userData = await localStorage.getItem("userInfo");
    if (!userData) return;
    const parsedUserData = JSON.parse(userData);
    setCompany(parsedUserData.id);
    setOwner(parsedUserData.name);
  };

  const showOrderDetails = () => {
    navigate(`/orderDetails/${company}`);
  };

  useEffect(() => {
    getIDFromLocalStorage();
  }, []);

  return (
    <ChangePasswordContainer>
      <InputField
        type="date"
        placeholder="Order Date"
        value={orderDate}
        onChange={(e) => setOrderDate(e.target.value)}
      />
      <InputField
        type="text"
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        readOnly
      />
      <InputField
        type="text"
        placeholder="Order Owner"
        value={owner}
        onChange={(e) => setOwner(e.target.value)}
        readOnly
      />
      <InputField
        type="text"
        placeholder="Item"
        value={item}
        onChange={(e) => setItem(e.target.value)}
      />
      <InputField
        type="number"
        placeholder="Count"
        value={count}
        onChange={(e) => setCount(e.target.value)}
      />
      <InputField
        type="text"
        placeholder="Weight"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
      <InputField
        type="text"
        placeholder="Request"
        value={requests}
        onChange={(e) => setRequests(e.target.value)}
      />
      {errors && <p>All fields are necessary</p>}
      <Button onClick={handleSubmit}>SUBMIT</Button>
      <Button onClick={showOrderDetails}>Show Order Details</Button>
    </ChangePasswordContainer>
  );
};

export default Customer;
