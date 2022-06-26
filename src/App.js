import React, { useEffect } from "react";

import { Route, Routes, useNavigate } from "react-router-dom";

import Delete from "./Pages/User/Logout";
import Invoice from "./Invoices/Invoice";
import ViewInvoice from "./Invoices/ViewInvoice";
import EditInvoice from "./Invoices/EditInvoice";
import AddInvoice from "./Invoices/AddInvoice";
import { useSelector } from "react-redux";
const App = () => {
  const navigate = useNavigate();
  const refresh = useSelector((state) => state.users.refresh);
  useEffect(() => {
    if (!refresh) {
      navigate("/");
    } else {
      console.log("Navigation is disabled");
    }
  }, [refresh]);
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Invoice />} />
        <Route exact path="/invoice/view/:id" element={<ViewInvoice />} />
      </Routes>
      <Delete />
      <EditInvoice />
      <AddInvoice />
    </>
  );
};

export default App;
