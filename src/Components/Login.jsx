import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { request } from "../requestMethods";

const LoginContainer = styled.div`
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

const Login = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!id || !password) {
      setErrors(true);
      return;
    }
    try {
      const res = await request.post("/login", { id, password });

      await localStorage.setItem(
        "userInfo",
        JSON.stringify({
          id: res.data[0].id,
          name: res.data[0].name,
        })
      );
      navigate("/customer", { replace: true });
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  return (
    <LoginContainer>
      <InputField
        type="text"
        placeholder="ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <InputField
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errors && <p>ALL field are necessary</p>}
      <Button onClick={handleLogin}>Login</Button>
      <Link to="/changePassword" style={{ textDecoration: "none" }}>
        <Button>Change Password</Button>
      </Link>
    </LoginContainer>
  );
};

export default Login;
