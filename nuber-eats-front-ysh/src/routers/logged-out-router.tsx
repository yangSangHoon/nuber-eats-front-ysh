import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CreateAccount } from "../pages/create-account";
import { Login } from "../pages/login";

export const LoggedOutRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/create-account" element={<CreateAccount />}></Route>
      <Route path="/" element={<Login />}></Route>
    </Routes>
  </BrowserRouter>
);
