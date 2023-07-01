import React, { useState } from "react";
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

const ChangePassword = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [updatedPassword, setUpdatedPassword] = useState("");
  const [repeatUpdatedPassword, setRepeatUpdatedPassword] = useState("");
  const [errors, setErrors] = useState(false);

  const handleChangePassword = async (e) => {
    const data = {
      mobileNumber: phoneNumber,
      password: updatedPassword,
      confirmPassword: repeatUpdatedPassword,
    };
    e.preventDefault();
    if (!phoneNumber || !updatedPassword || !repeatUpdatedPassword) {
      setErrors(true);
      return;
    }
    try {
      const res = await request.post("/changePassword", data);
      console.log(res.data);
      if (res.status === 200) {
        navigate("/customer");
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  return (
    <ChangePasswordContainer>
      <InputField
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <InputField
        type="password"
        placeholder="Updated Password"
        value={updatedPassword}
        onChange={(e) => setUpdatedPassword(e.target.value)}
      />
      <InputField
        type="password"
        placeholder="Repeat Updated Password"
        value={repeatUpdatedPassword}
        onChange={(e) => setRepeatUpdatedPassword(e.target.value)}
      />
      {errors && <p>All fields are necessary</p>}
      <Button onClick={handleChangePassword}>Change Password</Button>
    </ChangePasswordContainer>
  );
};

export default ChangePassword;
