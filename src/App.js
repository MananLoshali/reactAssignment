import { Route, Routes } from "react-router-dom";
import ChangePassword from "./Components/ChangePassword.jsx";
import Login from "./Components/Login.jsx";
import Customer from "./Components/Customer.jsx";
import OrderDetails from "./Components/OrderDetails.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/orderdetails/:id" element={<OrderDetails />} />
      </Routes>
    </div>
  );
}

export default App;
